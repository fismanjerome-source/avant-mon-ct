const SECTIONS = [
  {
    id: "quotidien",
    titre: "Entretien au quotidien",
    intro: "Quelques minutes régulières évitent la plupart des mauvaises surprises et des contre-visites.",
    points: [
      "Vérifiez la pression des pneus au moins une fois par mois, à froid (y compris la roue de secours).",
      "Contrôlez les niveaux : huile moteur, liquide de refroidissement, liquide de frein, lave-glace.",
      "Testez régulièrement tous vos feux et clignotants, seul ou avec un proche.",
      "Nettoyez les optiques, le pare-brise et les rétroviseurs pour une bonne visibilité.",
      "Écoutez les bruits inhabituels (freinage, moteur, suspension) : un bruit nouveau mérite un avis pro.",
    ],
  },
  {
    id: "revisions",
    titre: "Révisions et carnet d'entretien",
    intro: "La révision constructeur n'est pas obligatoire légalement, mais elle conditionne souvent la garantie et évite les pannes qui mènent à la contre-visite.",
    points: [
      "Respectez la périodicité indiquée dans le carnet d'entretien du constructeur (généralement tous les 15 000 à 30 000 km ou une fois par an selon le modèle et le carburant).",
      "Conservez les factures d'entretien : elles rassurent un futur acheteur et peuvent servir en cas de litige.",
      "Une vidange régulière (huile + filtre) limite l'usure moteur et les fumées d'échappement, un des premiers motifs de contre-visite.",
      "Faites contrôler les plaquettes et disques de frein dès les premiers signes d'usure (bruit, vibration, distance de freinage allongée).",
    ],
  },
  {
    id: "conduite",
    titre: "Conduite et usure prématurée",
    intro: "La façon de conduire influence directement l'état du véhicule et le risque de contre-visite.",
    points: [
      "Évitez les démarrages et freinages brusques répétés, qui usent prématurément plaquettes, pneus et embrayage.",
      "Laissez le moteur monter en température avant de solliciter fortement le véhicule, surtout en hiver.",
      "Un trajet uniquement en ville use davantage certains organes (filtre à particules, batterie) qu'un usage mixte route/ville.",
      "Ne roulez pas avec un voyant allumé sans vérifier sa cause : certains défauts s'aggravent rapidement.",
    ],
  },
  {
    id: "hiver",
    titre: "Préparer son véhicule pour l'hiver",
    intro: "La Loi Montagne 2 impose des équipements hiver dans 34 départements montagneux, du 1er novembre au 31 mars.",
    points: [
      "Pneus hiver, pneus 4 saisons homologués « 3PMSF », ou chaînes/chaussettes neige dans le coffre sont obligatoires en zone montagne durant la période réglementaire.",
      "Le marquage « M+S » seul ne suffit plus depuis la saison 2024/2025 : seul le marquage 3PMSF est reconnu conforme.",
      "Contrôlez l'état de la batterie : le froid est la première cause de panne hivernale.",
      "Faites le plein de liquide lave-glace spécial hiver (anti-gel) et vérifiez l'état des essuie-glaces.",
      "Rouler sans équipement obligatoire en zone concernée expose à une amende de 135€ et à une possible immobilisation.",
    ],
  },
  {
    id: "ete",
    titre: "Préparer son véhicule pour l'été",
    intro: "La chaleur et les longs trajets sollicitent différemment le véhicule.",
    points: [
      "Vérifiez la pression des pneus : elle doit être adaptée à la charge du véhicule en cas de départ en vacances chargé.",
      "Contrôlez le niveau de liquide de refroidissement avant un trajet long, la surchauffe étant plus fréquente en été.",
      "Faites vérifier la climatisation si elle refroidit moins bien qu'avant : un système mal entretenu peut aussi diminuer en performance au fil des ans.",
      "Inspectez l'état des pneus avant un grand départ : une forte chaleur aggrave l'usure d'un pneu déjà fragilisé.",
    ],
  },
];

export const metadata = {
  title: "Guide d'entretien : quotidien, révisions, hiver, été — Avant Mon CT",
  description:
    "Entretien quotidien, révisions, conduite, préparation hiver et été : les bons réflexes pour garder votre véhicule en bon état et limiter le risque de contre-visite.",
  alternates: { canonical: "/entretien" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Guide d'entretien automobile : quotidien, révisions, conduite, hiver, été",
  itemListElement: SECTIONS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.titre,
    description: s.intro,
  })),
};

export default function EntretienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <span className="eyebrow">Bons réflexes, pas de vente ni de produit</span>
      <h1>Entretenir son véhicule au fil de l'année</h1>
      <p className="lede">
        Un véhicule bien entretenu échoue rarement au contrôle technique. Voici
        les bons réflexes au quotidien, pour les révisions, la conduite, et
        selon la saison.
      </p>

      {SECTIONS.map((s) => (
        <div key={s.id} style={{ marginBottom: "1.5rem" }}>
          <div className="section-title" style={{ margin: "2.25rem 0 0.75rem" }}>
            <h2>{s.titre}</h2>
          </div>
          <p style={{ color: "var(--ink-soft)", marginBottom: "0.9rem" }}>{s.intro}</p>
          <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
            {s.points.map((p) => (
              <li key={p} style={{ marginBottom: "0.55rem", color: "var(--ink)", fontSize: "0.95rem" }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="source-note">
        Sources : Loi Montagne 2 (Code de la route), recommandations générales
        d'entretien automobile. Les intervalles de révision précis dépendent
        de votre modèle : reportez-vous toujours au carnet d'entretien de
        votre constructeur.
      </p>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <a className="card" href="/checklist">
          <h3>Checklist avant CT</h3>
          <p>Vérifiez les points qui expliquent la majorité des contre-visites.</p>
        </a>
        <a className="card" href="/points-controle">
          <h3>Les 136 points de contrôle</h3>
          <p>La liste complète et organisée des points vérifiés au contrôle technique.</p>
        </a>
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Besoin de faire vérifier votre véhicule ?</p>
        <p className="sub">Réservez votre contrôle technique dès maintenant.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
