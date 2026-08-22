export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
      <span className="eyebrow">Erreur 404</span>
      <h1 style={{ marginTop: "1rem" }}>Cette page n'existe pas</h1>
      <p className="lede" style={{ maxWidth: 460, margin: "0 auto 2rem" }}>
        Le lien est peut-être obsolète, ou l'adresse mal orthographiée.
        Voici quelques pages utiles :
      </p>

      <div className="card-grid" style={{ maxWidth: 620, margin: "0 auto" }}>
        <a className="card" href="/checklist">
          <h3>Checklist avant CT</h3>
          <p>Vérifiez votre véhicule avant le contrôle technique.</p>
        </a>
        <a className="card" href="/centres">
          <h3>Centres agréés</h3>
          <p>Trouvez un centre près de chez vous.</p>
        </a>
      </div>

      <p style={{ marginTop: "2.5rem" }}>
        <a href="/">← Retour à l'accueil</a>
      </p>
    </div>
  );
}
