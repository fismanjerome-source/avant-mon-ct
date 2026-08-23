export const metadata = {
  title: "Conditions générales d'utilisation — Avant Mon CT",
  description: "Conditions générales d'utilisation du site Avant Mon CT.",
  alternates: { canonical: "/cgu" },
  robots: { index: false, follow: true },
};

export default function CGUPage() {
  return (
    <>
      <h1>Conditions générales d'utilisation</h1>
      <p className="lede">
        En utilisant Avant Mon CT, vous acceptez les conditions décrites
        ci-dessous. Elles sont écrites simplement, sans jargon inutile.
      </p>

      <h2 style={{ marginTop: "2rem" }}>1. Objet du site</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Avant Mon CT est un service gratuit d'information sur le contrôle
        technique automobile en France : checklist d'auto-diagnostic,
        recherche de rappels constructeur, recherche de centres agréés,
        rappel d'échéance par email, et contenus informatifs (guide,
        entretien, points de contrôle, obligations de vente).
      </p>

      <h2>2. Un service d'information, pas un avis professionnel</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Les informations fournies (chiffres, règles, références juridiques)
        sont données à titre indicatif et sourcées du mieux possible, mais
        ne remplacent ni un contrôle technique réel, ni l'avis d'un
        professionnel (garagiste, contrôleur agréé, juriste). Avant Mon CT
        ne peut être tenu responsable d'une décision prise uniquement sur la
        base des informations du site.
      </p>

      <h2>3. Éditeur et lien avec Créneau CT</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Avant Mon CT est édité par la même entité que{" "}
        <a href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=cgu" target="_blank" rel="noopener noreferrer">
          Créneau CT
        </a>{" "}
        (réservation de créneaux de contrôle technique). Le site n'est ni un
        centre de contrôle technique, ni affilié à l'UTAC-OTC, à la DGCCRF
        ni à aucun organisme officiel. Les outils gratuits (checklist,
        rappels constructeur, recherche de centres) s'utilisent sans
        obligation de passer par Créneau CT.
      </p>

      <h2>4. Données ouvertes et fiabilité</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Une partie du contenu (rappels constructeur, annuaire des centres,
        prix moyens) provient d'API publiques tierces (data.gouv.fr,
        data.economie.gouv.fr). Avant Mon CT ne garantit pas l'exactitude ou
        la disponibilité continue de ces données, dont la mise à jour dépend
        des organismes qui les publient.
      </p>

      <h2>5. Compte et données personnelles</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Aucun compte n'est requis pour utiliser le site. Le formulaire de
        rappel d'échéance collecte une plaque d'immatriculation, un email et
        une date, uniquement pour l'envoi du rappel. Voir la{" "}
        <a href="/confidentialite">politique de confidentialité</a> pour le
        détail. Pour exercer vos droits RGPD, contactez contact@creneauct.fr.
      </p>

      <h2>6. Usage autorisé</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Le site est destiné à un usage personnel et non commercial. Toute
        extraction automatisée massive du contenu (scraping) sans accord
        préalable n'est pas autorisée.
      </p>

      <h2>7. Modification des CGU</h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Ces conditions peuvent être mises à jour ; la version en ligne sur
        cette page fait foi.
      </p>

      <p className="source-note">
        Pour toute question, voir les{" "}
        <a href="/mentions-legales">mentions légales</a>.
      </p>
    </>
  );
}
