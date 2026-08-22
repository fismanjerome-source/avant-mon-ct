const DATASET_URL =
  "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/annuaire-centres-controle-technique/records";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const codePostal = searchParams.get("codePostal");
  const type = searchParams.get("type") === "moto" ? "moto" : "voiture";

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

  const res = await fetch(url, { next: { revalidate: 3600 } });
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
    .map((c) => ({
      nom: premiereValeur(c.cct_denomination),
      adresse: premiereValeur(c.cct_adresse),
      codePostal: premiereValeur(c.cct_code_postal),
      commune: premiereValeur(c.cct_commune),
      telephone: premiereValeur(c.cct_tel),
      url: c.cct_url,
    }))
    // rapproche du code postal recherché en priorité
    .sort((a, b) => {
      const aMatch = a.codePostal === codePostal ? 0 : 1;
      const bMatch = b.codePostal === codePostal ? 0 : 1;
      return aMatch - bMatch;
    });

  return Response.json({ total: data.total_count, centres });
}
