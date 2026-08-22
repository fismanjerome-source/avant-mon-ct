export const metadata = {
  title: "Mentions légales — Avant Mon CT",
  description: "Mentions légales du site Avant Mon CT.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <h1>Mentions légales</h1>

      <div className="info-box danger">
        <strong>Nom, statut, SIRET et adresse à compléter dès
        l'immatriculation de l'activité.</strong> Afficher des mentions
        légales incomplètes ou inexactes est une infraction en droit
        français (loi n°2004-575 du 21 juin 2004 pour la confiance dans
        l'économie numérique). Les champs entre crochets ci-dessous doivent
        être complétés avant toute mise en ligne publique — cherchez{" "}
        <code>data-todo</code> dans le code de cette page.
      </div>

      <h2 style={{ marginTop: "2rem" }}>Éditeur du site</h2>
      <p
        style={{ color: "var(--ink-soft)" }}
        data-todo="nom, statut (entreprise individuelle, société...), SIRET, adresse — identiques à ceux de Créneau CT, à compléter dès l'immatriculation"
      >
        Avant Mon CT est édité par la même personne/entité que{" "}
        <a href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
          Créneau CT
        </a>{" "}
        :<br />
        [Nom et prénom ou dénomination sociale à compléter]
        <br />
        Statut : [Entrepreneur individuel / Auto-entrepreneur / Société — à
        compléter]
        <br />
        SIRET : [à compléter après immatriculation]
        <br />
        Adresse : [adresse à compléter]
        <br />
        Email de contact : contact@creneauct.fr
        <br />
        Téléphone : 06 08 12 91 45
      </p>

      <h2>Directeur de la publication</h2>
      <p
        style={{ color: "var(--ink-soft)" }}
        data-todo="nom du responsable de publication"
      >
        [Nom du responsable de publication à compléter]
      </p>

      <h2>Hébergement</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Le site est hébergé par :
        <br />
        Render Services, Inc.
        <br />
        525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis
        <br />
        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
          render.com
        </a>
      </p>
      <p style={{ color: "var(--ink-soft)" }}>
        La base de données est hébergée par :
        <br />
        Turso (Iku Inc.)
        <br />
        <a href="https://turso.tech" target="_blank" rel="noopener noreferrer">
          turso.tech
        </a>
      </p>

      <h2>Nature du site</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Avant Mon CT est un site d'information gratuit sur le contrôle
        technique automobile en France, édité par la même entité que{" "}
        <a href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
          Créneau CT
        </a>{" "}
        (réservation de créneaux de contrôle technique). Il n'est ni un
        centre de contrôle technique, ni affilié à l'UTAC-OTC, à la DGCCRF,
        ni à aucun organisme officiel. Les données affichées proviennent de
        sources ouvertes (open data) citées sur chaque page.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Le contenu de ce site (textes, structure) est la propriété de son
        éditeur. Les photographies sont utilisées sous licence Unsplash
        (usage libre, crédits affichés). Les données chiffrées proviennent de
        jeux de données publics cités en source sur chaque page.
      </p>

      <h2>Données personnelles</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Conformément au RGPD, vous disposez d'un droit d'accès, de
        rectification et de suppression de vos données, exerçable auprès de
        contact@creneauct.fr. Voir le détail dans la{" "}
        <a href="/confidentialite">politique de confidentialité</a> et les{" "}
        <a href="/cgu">CGU</a>.
      </p>

      <h2>Cookies</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Ce site n'utilise pas de cookies de mesure d'audience ni de
        publicité à ce jour.
      </p>

      <h2>Médiation de la consommation</h2>
      <p
        style={{ color: "var(--ink-soft)" }}
        data-todo="coordonnées du médiateur à compléter après immatriculation de l'activité"
      >
        Conformément à l'article L.616-1 du Code de la consommation, en cas
        de litige non résolu directement avec nous, vous pouvez recourir
        gratuitement à un médiateur de la consommation. [Coordonnées du
        médiateur à compléter].
      </p>
    </>
  );
}
