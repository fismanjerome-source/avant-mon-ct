const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Peut-on vendre une voiture sans contrôle technique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, si le véhicule a plus de 4 ans et que l'acheteur est un particulier : un contrôle technique de moins de 6 mois doit obligatoirement être remis à l'acheteur (article R323-22 du Code de la route).",
      },
    },
    {
      "@type": "Question",
      name: "Le contrôle technique de vente est-il à la charge du vendeur ou de l'acheteur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est au vendeur de fournir un contrôle technique valide (moins de 6 mois) à ses frais avant la vente.",
      },
    },
  ],
};

export const metadata = {
  title: "Vendre ou acheter une voiture d'occasion : le contrôle technique obligatoire — Avant Mon CT",
  description:
    "Ce que dit la loi sur le contrôle technique lors de la vente d'un véhicule d'occasion : délai de 6 mois, exceptions, et cas particuliers (électrique, collection, importé).",
  alternates: { canonical: "/vente-occasion" },
};

export default function VenteOccasionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <span className="eyebrow">Article R323-22 du Code de la route</span>
      <h1>Vendre ou acheter une voiture d'occasion : ce que dit la loi</h1>
      <p className="lede">
        Vendre un véhicule sans contrôle technique valide n'est pas qu'une
        mauvaise idée commerciale, c'est souvent une obligation légale.
        Voici les règles, sans jargon.
      </p>

      <div className="info-box danger">
        <strong>La règle principale.</strong> Pour tout véhicule de plus de 4
        ans vendu à un particulier, le vendeur doit fournir un contrôle
        technique daté de <strong>moins de 6 mois</strong> à la date de la
        vente (article R323-22 du Code de la route). Sans ce document,
        l'acheteur ne peut pas obtenir sa nouvelle carte grise, et le vendeur
        s'expose à voir la vente contestée.
      </div>

      <p>
        Si le dernier contrôle a débouché sur une contre-visite, c'est le
        rapport de cette <strong>contre-visite</strong> qui doit être remis,
        et il doit dater de <strong>moins de 2 mois</strong> à la date de la
        vente, pas les 6 mois habituels.
      </p>

      <div className="section-title">
        <h2>Cas particuliers</h2>
      </div>

      <p>
        <strong style={{ color: "var(--bleu-900)" }}>Véhicule électrique.</strong>{" "}
        Soumis aux mêmes règles de vente que les autres véhicules. Le
        contrôle ne comprend logiquement pas de mesure de pollution (pas de
        combustion), mais porte sur les autres fonctions (freinage,
        direction, sécurité électrique, etc.).
      </p>
      <p>
        <strong style={{ color: "var(--bleu-900)" }}>Véhicule de collection.</strong>{" "}
        Périodicité allongée à 5 ans (au lieu de 2) pour un véhicule
        immatriculé en collection. Les modèles antérieurs à 1960 sont
        dispensés de contrôle périodique, sauf en cas de vente, où un
        contrôle de moins de 6 mois reste exigé.
      </p>
      <p>
        <strong style={{ color: "var(--bleu-900)" }}>Véhicule importé.</strong>{" "}
        Un véhicule importé doit passer un contrôle technique français dans
        les 6 mois suivant son immatriculation en France, même s'il a déjà
        été contrôlé dans le pays d'origine.
      </p>

      <p className="lede" style={{ fontSize: "0.95rem" }}>
        À noter : une rumeur a circulé sur un passage au contrôle technique
        annuel dès 10 ans à partir de 2026. C'est une proposition européenne
        à laquelle la France s'oppose officiellement, et qui ne s'applique
        pas aujourd'hui : la périodicité reste de 2 ans après le premier
        contrôle à 4 ans.
      </p>

      <p className="source-note">
        Sources : article R323-22 du Code de la route (Légifrance),
        réglementation sur les véhicules de collection et l'importation.
        Cette page est informative et ne remplace pas un avis juridique.
      </p>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <a className="card" href="/checklist">
          <h3>Checklist avant vente</h3>
          <p>Vérifiez votre véhicule avant de passer le contrôle technique de vente.</p>
        </a>
        <a className="card" href="/centres">
          <h3>Trouver un centre agréé</h3>
          <p>Pour faire établir votre contrôle technique de moins de 6 mois.</p>
        </a>
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Besoin de faire établir votre contrôle de vente ?</p>
        <p className="sub">Réservez un créneau rapidement.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=vente-occasion" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
