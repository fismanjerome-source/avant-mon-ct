export const metadata = {
  title: "Politique de confidentialité — Avant Mon CT",
  description: "Quelles données Avant Mon CT collecte, pourquoi, et comment les supprimer.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Politique de confidentialité — Avant Mon CT",
    description: "Quelles données Avant Mon CT collecte, pourquoi, et comment les supprimer.",
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p className="lede">
        Ce site collecte le strict minimum de données, uniquement pour rendre
        le service demandé. Voici, en clair, ce qui est stocké.
      </p>

      <div className="section-title">
        <h2>Ce que nous collectons</h2>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>
        Le seul formulaire qui collecte des données personnelles est le{" "}
        <a href="/rappel">rappel d'échéance</a> : plaque d'immatriculation,
        adresse email, date d'échéance de votre contrôle technique. Ces
        informations sont enregistrées dans une base de données afin de vous
        envoyer un rappel avant l'échéance.
      </p>
      <p style={{ color: "var(--ink-soft)" }}>
        Les autres outils du site (checklist, recherche de rappels
        constructeur, recherche de centres) fonctionnent sans création de
        compte et ne stockent aucune donnée personnelle : les recherches sont
        transmises aux API publiques concernées (RappelConso, annuaire des
        centres, base adresse nationale) sans être conservées de notre côté.
      </p>

      <div className="section-title">
        <h2>Ce que nous ne faisons pas</h2>
      </div>
      <ul style={{ color: "var(--ink-soft)" }}>
        <li>Nous ne vendons ni ne partageons vos données avec des tiers à des fins commerciales.</li>
        <li>Nous n'utilisons pas de cookies publicitaires ni de traceurs tiers.</li>
        <li>Nous ne revendons pas votre adresse email.</li>
      </ul>

      <div className="section-title">
        <h2>Durée de conservation</h2>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>
        Les données du rappel d'échéance sont conservées jusqu'à la date
        d'échéance renseignée, puis supprimées. Vous pouvez demander leur
        suppression à tout moment (voir contact ci-dessous).
      </p>

      <div className="section-title">
        <h2>Vos droits</h2>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>
        Conformément au RGPD, vous disposez d'un droit d'accès, de
        rectification et de suppression des données vous concernant. Pour
        exercer ce droit, contactez-nous à contact@creneauct.fr.
      </p>

      <p className="source-note">
        Avant Mon CT est édité par la même entité que{" "}
        <a href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=confidentialite" target="_blank" rel="noopener noreferrer">
          Créneau CT
        </a>
        , voir les{" "}
        <a href="/mentions-legales">mentions légales</a> pour les coordonnées
        complètes (SIRET et adresse à finaliser lors de l'immatriculation).
      </p>
    </>
  );
}
