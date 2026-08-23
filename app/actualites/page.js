const ACTUALITES = [
  {
    date: "2026-04-01",
    titre: "Bilan annuel du contrôle technique 2025 publié par l'UTAC-OTC",
    resume:
      "27 611 997 contrôles techniques réalisés en France en 2025 (+3,63% vs 2024), dont plus de 23 millions de contrôles périodiques obligatoires. Taux de contre-visites stable à 18,94% pour les véhicules légers.",
    source: "UTAC-OTC — organisme technique central",
    lien: "https://www.utac-otc.com",
  },
  {
    date: "2026-03-01",
    titre: "Entrée en vigueur du contrôle au céléromètre pour les cyclomoteurs 50cc",
    resume:
      "Depuis le 1er mars 2026, les centres de contrôle technique moto doivent utiliser un céléromètre pour mesurer la vitesse réelle des cyclomoteurs de 50 cm³ sur banc à rouleaux, en complément du contrôle visuel.",
    source: "Réglementation contrôle technique catégorie L",
    lien: "https://www.service-public.fr",
  },
  {
    date: "2026-01-01",
    titre: "Calendrier du contrôle technique moto : échéance pour les immatriculations 2020-2021",
    resume:
      "Les véhicules de catégorie L (motos, scooters) immatriculés pour la première fois entre le 1er janvier 2020 et le 31 décembre 2021 doivent effectuer leur premier contrôle technique avant le 31 décembre 2026.",
    source: "Calendrier officiel de déploiement du CT moto",
    lien: "https://www.service-public.fr",
  },
];

export const metadata = {
  title: "Actualités du contrôle technique — Avant Mon CT",
  description:
    "Les dernières actualités réglementaires et chiffres officiels du contrôle technique en France : calendrier, nouveautés, bilans UTAC-OTC.",
  alternates: { canonical: "/actualites" },
};

export default function ActualitesPage() {
  return (
    <>
      <span className="eyebrow">Sélection vérifiée, sources officielles</span>
      <h1>Actualités du contrôle technique</h1>
      <p className="lede">
        Les évolutions réglementaires et chiffres officiels qui concernent le
        contrôle technique en France, avec un lien vers la source pour
        vérifier chaque information par vous-même.
      </p>

      {ACTUALITES.map((a) => (
        <div
          key={a.titre}
          style={{
            border: "1px solid var(--ligne)",
            borderRadius: 12,
            padding: "1.3rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>
            {new Date(a.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
            })}
          </span>
          <h3 style={{ margin: "0.3rem 0 0.5rem" }}>{a.titre}</h3>
          <p style={{ color: "var(--ink-soft)", margin: "0 0 0.6rem" }}>{a.resume}</p>
          <a href={a.lien} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem" }}>
            Source : {a.source} →
          </a>
        </div>
      ))}

      <div className="info-box">
        <strong>Pourquoi pas un flux Légifrance en direct ?</strong> Légifrance
        propose une API officielle (PISTE), mais elle nécessite une
        inscription et des identifiants OAuth2 propres à chaque compte — je
        ne peux pas la connecter sans que vous créiez un compte gratuit sur{" "}
        <a href="https://piste.gouv.fr" target="_blank" rel="noopener noreferrer">
          piste.gouv.fr
        </a>{" "}
        et me transmettiez les identifiants. En attendant, cette page reste
        une sélection vérifiée manuellement, avec liens sourcés vers les
        textes et sites officiels.
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Envie de vérifier votre véhicule ?</p>
        <p className="sub">Checklist, rappels constructeur et centres agréés, gratuitement.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=actualites" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
