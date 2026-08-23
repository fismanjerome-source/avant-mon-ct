const DATASET_URL =
  "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/annuaire-centres-controle-technique/records";

const CT_API_URL = "https://creneauct.fr/api/centres";

// Mots trop génériques pour servir à distinguer deux centres (sinon
// "Centre de contrôle technique" matcherait avec n'importe qui).
const MOTS_VIDES = new Set([
  "controle", "technique", "auto", "automobile", "centre", "cct", "ct",
  "de", "du", "des", "la", "le", "les", "et", "sarl", "sas", "sasu",
  "eurl", "ste", "societe",
]);

function normaliser(str) {
  const sansAccents = (str || "")
    .normalize("NFD")
    .split("")
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join("");
  return sansAccents
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function motsSignificatifs(str) {
  return normaliser(str)
    .split(" ")
    .filter((mot) => mot.length > 2 && !MOTS_VIDES.has(mot));
}

// Rapproche un centre de l'annuaire officiel (DGCCRF) d'un centre
// partenaire Créneau CT : même code postal exact, et au moins un mot
// significatif commun dans le nom (l'enseigne, en général).
function correspond(centreDgccrf, centreCt) {
  if (centreDgccrf.codePostal !== centreCt.code_postal) return false;
  const motsA = motsSignificatifs(centreDgccrf.nom);
  const motsB = new Set([
    ...motsSignificatifs(centreCt.nom),
    ...motsSignificatifs(centreCt.enseigne),
  ]);
  return motsA.some((mot) => motsB.has(mot));
}

// Distance à vol d'oiseau entre deux points GPS, en kilomètres (formule de
// Haversine). Suffisant pour trier une liste de centres par proximité —
// pas besoin d'un vrai calcul d'itinéraire routier pour ça.
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function centresCreneauCT(departement) {
  try {
    const res = await fetch(`${CT_API_URL}?cp=${departement}`, {
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.centres || []).filter((c) => !c.est_demo);
  } catch {
    // Créneau CT indisponible : on continue sans le badge, l'annuaire
    // officiel reste utilisable seul.
    return [];
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const codePostal = searchParams.get("codePostal");
  const type = searchParams.get("type") === "moto" ? "moto" : "voiture";
  const latRecherche = parseFloat(searchParams.get("lat"));
  const lonRecherche = parseFloat(searchParams.get("lon"));
  const aCoordonnees = Number.isFinite(latRecherche) && Number.isFinite(lonRecherche);

  if (!codePostal || codePostal.length < 2) {
    return Response.json({ error: "Code postal requis." }, { status: 400 });
  }

  const departement = codePostal.slice(0, 2);
  const categorieFilter =
    type === "moto"
      ? `cat_vehicule_libelle="Cyclomoteur"`
      : `cat_vehicule_libelle="Voiture particulière"`;

  const where = `code_departement="${departement}" and ${categorieFilter}`;
  const url = `${DATASET_URL}?where=${encodeURIComponent(where)}&limit=20`;

  const [res, partenairesCT] = await Promise.all([
    fetch(url, { next: { revalidate: 3600 } }),
    centresCreneauCT(departement),
  ]);
  if (!res.ok) {
    return Response.json({ error: "Annuaire indisponible." }, { status: 502 });
  }
  const data = await res.json();

  // Le champ "commune" de l'annuaire officiel contient parfois la même
  // valeur répétée plusieurs fois séparée par "/" (une entrée par
  // catégorie de véhicule couverte par le centre). On ne garde que la
  // première valeur.
  function premiereValeur(val) {
    if (!val) return val;
    return String(val).split("/")[0].trim();
  }

  const centres = (data.results || [])
    .map((c) => {
      const lat = parseFloat(c.latitude);
      const lon = parseFloat(c.longitude);
      const centreDgccrf = {
        nom: premiereValeur(c.cct_denomination),
        adresse: premiereValeur(c.cct_adresse),
        codePostal: premiereValeur(c.cct_code_postal),
        commune: premiereValeur(c.cct_commune),
        telephone: premiereValeur(c.cct_tel),
        url: c.cct_url,
        distanceKm:
          aCoordonnees && Number.isFinite(lat) && Number.isFinite(lon)
            ? Math.round(distanceKm(latRecherche, lonRecherche, lat, lon) * 10) / 10
            : null,
      };
      const centreCt = partenairesCT.find((p) => correspond(centreDgccrf, p));
      return {
        ...centreDgccrf,
        reservableSurCreneauCT: centreCt
          ? `https://creneauct.fr/centre/${centreCt.id}?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=centres-match`
          : null,
      };
    })
    .sort((a, b) => {
      // Tri par distance réelle quand on connaît les coordonnées de la
      // ville recherchée (les centres sans coordonnées passent en dernier).
      if (aCoordonnees) {
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      }
      // Sinon, on retombe sur le rapprochement par code postal exact.
      const aMatch = a.codePostal === codePostal ? 0 : 1;
      const bMatch = b.codePostal === codePostal ? 0 : 1;
      return aMatch - bMatch;
    });

  return Response.json({ total: data.total_count, centres });
}
