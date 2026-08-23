import Image from "next/image";
import FranceMap from "../components/FranceMap";

const MOTIFS = [
  { label: "Éclairage et signalisation", pct: 28 },
  { label: "Freinage", pct: 22 },
  { label: "Pollution et échappement", pct: 18 },
  { label: "Pneumatiques", pct: 12 },
  { label: "Direction et suspension", pct: 10 },
  { label: "Autres (carrosserie, structure, liaisons au sol...)", pct: 10 },
];

const FAQ = [
  {
    q: "Combien coûte un contrôle technique en France ?",
    a: "Le prix n'est pas réglementé et varie d'un centre à l'autre. La moyenne nationale réelle, calculée à partir des tarifs déclarés par les centres, tourne autour de 84€ pour une voiture particulière et 67€ pour un cyclomoteur/moto.",
  },
  {
    q: "Combien de temps dure un contrôle technique ?",
    a: "Comptez environ 30 à 45 minutes pour un contrôle complet d'un véhicule léger, un peu moins pour une moto (environ 80 points contrôlés contre 130 pour une voiture).",
  },
  {
    q: "Que risque-t-on à rouler avec un contrôle technique périmé ?",
    a: "Une amende forfaitaire de 135€ (minorée à 90€ en cas de paiement rapide), et une possible immobilisation du véhicule en cas de contrôle routier.",
  },
  {
    q: "Combien de temps a-t-on pour faire une contre-visite ?",
    a: "En cas de contre-visite prescrite, vous disposez d'un délai de 2 mois à compter du contrôle initial pour faire réparer le véhicule et repasser le contrôle. Passé ce délai, un contrôle complet doit être repassé.",
  },
  {
    q: "Quel est le taux de réussite au contrôle technique en France ?",
    a: "Selon le bilan annuel de l'UTAC-OTC (organisme technique central), le taux de contre-visites prescrites pour les véhicules légers s'est établi à 18,94% en 2025, soit environ 1 véhicule sur 5.",
  },
  {
    q: "Combien de contrôles techniques sont réalisés chaque année en France ?",
    a: "27 611 997 contrôles techniques ont été réalisés en France en 2025 selon l'UTAC-OTC, en hausse de 3,63% par rapport à 2024, dont plus de 23 millions de contrôles périodiques obligatoires.",
  },
  {
    q: "Le contrôle technique moto est-il différent du contrôle voiture ?",
    a: "Oui. Périodicité tous les 3 ans (contre 2 ans pour une voiture après le premier contrôle à 4 ans), environ 80 points contrôlés dont 25 spécifiques aux deux-roues (chaîne, fourche, garde-boue). Plus de 2,2 millions de contrôles moto ont été réalisés entre avril 2024 et fin 2025.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata = {
  title: "Guide et chiffres officiels du contrôle technique — Avant Mon CT",
  description:
    "Prix moyen réel, durée, taux de contre-visite, motifs d'échec, délais légaux : le guide complet du contrôle technique voiture et moto en France, avec les chiffres officiels UTAC-OTC et data.economie.gouv.fr.",
  alternates: { canonical: "/guide" },
};

async function getPrixMoyen() {
  const base =
    "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-controle-technique/records";
  const select = "avg(prix_visite) as moyenne, count(*) as total";

  try {
    const [voitureRes, motoRes] = await Promise.all([
      fetch(
        `${base}?select=${encodeURIComponent(select)}&where=${encodeURIComponent(
          `cat_vehicule_libelle="Voiture particulière"`
        )}`,
        { next: { revalidate: 86400 } }
      ),
      fetch(
        `${base}?select=${encodeURIComponent(select)}&where=${encodeURIComponent(
          `cat_vehicule_id=6`
        )}`,
        { next: { revalidate: 86400 } }
      ),
    ]);
    const voiture = await voitureRes.json();
    const moto = await motoRes.json();
    return {
      voiture: voiture.results?.[0]?.moyenne ?? null,
      voitureN: voiture.results?.[0]?.total ?? null,
      moto: moto.results?.[0]?.moyenne ?? null,
      motoN: moto.results?.[0]?.total ?? null,
    };
  } catch {
    return { voiture: null, voitureN: null, moto: null, motoN: null };
  }
}

export default async function GuidePage() {
  const prix = await getPrixMoyen();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <span className="eyebrow">Chiffres officiels UTAC-OTC 2025 &amp; data.economie.gouv.fr</span>
      <h1>Comprendre le contrôle technique en France</h1>
      <p className="lede">
        Le contrôle technique voiture porte sur environ 130 points, contre 80
        pour une moto. Voici les données officielles et les motifs de
        contre-visite les plus fréquents.
      </p>

      <div className="photo-banner">
        <Image
          src="/images/compteur-vitesse.jpg"
          alt="Gros plan sur un compteur de vitesse analogique"
          fill
          sizes="(max-width: 880px) 100vw, 880px"
          style={{ objectFit: "cover" }}
        />
        <span className="caption">130 points contrôlés, 100% vérifiables</span>
        <span className="credit">Photo : CHUTTERSNAP / Unsplash</span>
      </div>

      <div className="wrap" style={{ padding: 0 }}>
        <div className="stat-strip">
          <div className="stat">
            <span className="num">27,6 M</span>
            <span className="cap">contrôles réalisés en 2025 (UTAC-OTC)</span>
          </div>
          <div className="stat">
            <span className="num">18,94%</span>
            <span className="cap">taux de contre-visites, véhicules légers</span>
          </div>
          <div className="stat">
            <span className="num">
              {prix.voiture ? `${prix.voiture.toFixed(0)}€` : "≈84€"}
            </span>
            <span className="cap">
              prix moyen réel d'un contrôle voiture
              {prix.voitureN ? ` (${prix.voitureN.toLocaleString("fr-FR")} tarifs)` : ""}
            </span>
          </div>
          <div className="stat">
            <span className="num">
              {prix.moto ? `${prix.moto.toFixed(0)}€` : "≈67€"}
            </span>
            <span className="cap">
              prix moyen réel d'un contrôle moto
              {prix.motoN ? ` (${prix.motoN.toLocaleString("fr-FR")} tarifs)` : ""}
            </span>
          </div>
        </div>
        <p className="source-note" style={{ marginTop: "-1.5rem", marginBottom: "2rem" }}>
          Prix moyens calculés en direct sur les tarifs déclarés par les
          centres agréés (data.economie.gouv.fr, jeu de données "Prix des
          contrôles techniques").
        </p>
      </div>

      <div className="section-title">
        <h2>Motifs de contre-visite les plus fréquents (voiture)</h2>
        <span className="note">part estimée des contre-visites</span>
      </div>

      <ul className="motif-list">
        {MOTIFS.map((m) => (
          <li key={m.label}>
            <span className="name">{m.label}</span>
            <span className="bar-track">
              <span className="bar-fill" style={{ width: `${m.pct * 3}%` }} />
            </span>
            <span className="pct">{m.pct}%</span>
          </li>
        ))}
      </ul>
      <p className="source-note">
        Chiffres couramment publiés par les professionnels du secteur, à
        recouper avec le bilan annuel de l'UTAC-OTC, organisme technique
        central du contrôle technique en France.
      </p>

      <div className="info-box">
        <strong>Bon à savoir.</strong> En cas de contre-visite, vous avez 2
        mois pour faire réparer votre véhicule et le représenter, sinon il
        faut repasser un contrôle complet. Rouler avec un contrôle technique
        expiré expose à une amende de 135€ (90€ en paiement rapide) et à une
        possible immobilisation du véhicule.
      </div>

      <div className="info-box">
        <strong>Voiture ou moto ?</strong> La périodicité diffère : une
        voiture est contrôlée 4 ans après sa 1ère immatriculation puis tous
        les 2 ans ; une moto (catégorie L) tous les 3 ans. Le contrôle moto
        vérifie environ 80 points, dont 25 propres aux deux-roues (chaîne,
        fourche, garde-boue). Utilisez la{" "}
        <a href="/checklist">checklist adaptée à votre véhicule</a>.
      </div>

      <div className="info-box danger">
        <strong>Le contrôle technique doit obligatoirement être réalisé dans
        un centre agréé.</strong> Un contrôle réalisé ailleurs, ou délivré
        sans que le véhicule soit physiquement présenté et inspecté par un
        contrôleur (« contrôle technique de complaisance »), n'a aucune
        valeur légale et constitue un <strong>faux et usage de faux</strong> au
        sens de l'<strong>article 441-1 du Code pénal</strong> — jusqu'à 3 ans
        d'emprisonnement et 45 000€ d'amende, pour le centre comme pour le
        conducteur qui l'utilise sciemment. Trouvez un{" "}
        <a href="/centres">centre réellement agréé</a> sur notre annuaire
        officiel avant de vous déplacer.
      </div>

      <div className="section-title">
        <h2>Disparités régionales</h2>
        <span className="note">taux de contre-visite par département</span>
      </div>

      <p className="lede">
        Le taux de contre-visite varie fortement selon le département — dans
        un département sur deux, il est inférieur à 19,08%, mais les écarts
        sont marqués. Survolez la carte pour voir le nom de chaque
        département.
      </p>

      <FranceMap />

      <p className="source-note" style={{ marginTop: "1.5rem" }}>
        Carte des 96 départements (tracé réel, données géographiques ouvertes
        gregoiredavid/france-geojson). Le bilan UTAC-OTC complet par
        département est publié au format PDF et n'est pas structuré en open
        data exploitable automatiquement — au survol, seuls les 3
        départements vérifiés affichent un chiffre 2025 (source : bilan
        UTAC-OTC 2025, relayé par L'Argus), les autres indiquent "donnée non
        disponible" plutôt qu'un chiffre inventé. Le détail complet par
        département est disponible directement sur{" "}
        <a href="https://www.utac-otc.com" target="_blank" rel="noopener noreferrer">
          utac-otc.com
        </a>
        .
      </p>

      <div className="section-title">
        <h2>Questions fréquentes</h2>
      </div>

      {FAQ.map((item) => (
        <div key={item.q} style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>
            {item.q}
          </h3>
          <p style={{ color: "var(--ink-soft)", margin: 0 }}>{item.a}</p>
        </div>
      ))}

      <p className="source-note">
        Sources : bilan annuel UTAC-OTC (organisme technique central du
        contrôle technique en France), jeu de données "Prix des contrôles
        techniques" (data.economie.gouv.fr), Code de la route,
        service-public.fr.
      </p>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <a className="card" href="/rappels">
          <h3>Rappels constructeur</h3>
          <p>Vérifiez si votre marque fait l'objet d'un rappel officiel (RappelConso).</p>
        </a>
        <a className="card" href="/centres">
          <h3>Centres agréés près de chez vous</h3>
          <p>Recherchez dans l'annuaire officiel des centres de contrôle technique.</p>
        </a>
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Besoin de faire vérifier votre véhicule ?</p>
        <p className="sub">
          Commencez par la checklist gratuite, puis réservez votre créneau.
        </p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=guide" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
