export const metadata = {
  title: "À propos — Avant Mon CT",
  description: "Pourquoi ce site existe, comment il est financé, et d'où viennent ses chiffres.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <span className="eyebrow">Transparence</span>
      <h1>À propos d'Avant Mon CT</h1>
      <p className="lede">
        Ce site répond à un constat simple : la plupart des motifs de
        contre-visite sont évitables, mais l'information officielle est
        éparpillée entre des PDF, des sites administratifs et des articles de
        blog contradictoires. Avant Mon CT rassemble cette information à un
        seul endroit, gratuitement.
      </p>

      <div className="section-title">
        <h2>D'où viennent les chiffres ?</h2>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>
        Chaque donnée affichée sur ce site est sourcée et vérifiable : bilan
        annuel de l'UTAC-OTC (organisme technique central du contrôle
        technique en France), API officielles de la DGCCRF (RappelConso,
        annuaire des centres agréés, prix des contrôles techniques),
        Légifrance et service-public.fr pour les références juridiques. Nous
        ne publions aucun chiffre inventé — quand une donnée précise n'existe
        pas en accès public, nous le disons explicitement plutôt que de
        l'estimer sans le préciser.
      </p>

      <div className="section-title">
        <h2>Le lien avec Créneau CT</h2>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>
        Avant Mon CT est édité par la même entité que{" "}
        <a href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=a-propos" target="_blank" rel="noopener noreferrer">
          <strong>Créneau CT</strong>
        </a>
        , une plateforme de réservation de créneaux de contrôle technique.
        Les outils gratuits de ce site (checklist, rappels constructeur,
        recherche de centres) s'utilisent gratuitement et sans compte à
        créer, sans obligation de passer par Créneau CT — le lien "Prendre
        RDV" en fin de page est une option, pas un passage obligé.
      </p>

      <div className="section-title">
        <h2>Ce que ce site n'est pas</h2>
      </div>
      <ul style={{ color: "var(--ink-soft)" }}>
        <li>Ce n'est pas un centre de contrôle technique, ni un organisme officiel.</li>
        <li>Ce n'est pas affilié à l'UTAC-OTC, à la DGCCRF ni à aucune administration.</li>
        <li>Les informations juridiques données sont générales et ne remplacent pas un avis professionnel.</li>
      </ul>

      <p className="source-note">
        Pour toute question, voir les{" "}
        <a href="/mentions-legales">mentions légales</a>, les{" "}
        <a href="/cgu">CGU</a> et la{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Prêt à vérifier votre véhicule ?</p>
        <p className="sub">Commencez par la checklist gratuite.</p>
        </div>
        
        <a className="btn" href="/checklist">
          Faire la checklist
        </a>
      </div>
    </>
  );
}
