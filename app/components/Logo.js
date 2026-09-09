export default function Logo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      role="img"
      aria-label="Avant Mon CT"
      style={{ flexShrink: 0 }}
    >
      <circle cx="80" cy="80" r="76" fill="#1B3A5C" />
      <circle cx="80" cy="80" r="76" fill="none" stroke="#D9A62E" strokeWidth="3" />

      {/* Douze repères, même langage graphique que Créneau CT */}
      <g stroke="#D9A62E" strokeWidth="3" strokeLinecap="round" opacity="0.9">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const rExt = 71;
          const rInt = 62;
          // Arrondi à 2 décimales : Math.sin/cos peuvent renvoyer un résultat
          // qui diffère de ~1e-13 entre le moteur V8 du serveur (Node) et
          // celui du navigateur pour le même angle, ce qui suffit à casser
          // l'hydratation React. Sans incidence visuelle sur une icône de
          // cette taille.
          const arrondi = (n) => Math.round(n * 100) / 100;
          const x1 = arrondi(80 + rInt * Math.sin(angle));
          const y1 = arrondi(80 - rInt * Math.cos(angle));
          const x2 = arrondi(80 + rExt * Math.sin(angle));
          const y2 = arrondi(80 - rExt * Math.cos(angle));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <circle cx="80" cy="80" r="48" fill="#1B3A5C" stroke="#D9A62E" strokeWidth="1.5" />

      {/* Coche de vérification, dorée */}
      <path
        d="M 58,82 L 73,97 L 104,62"
        fill="none"
        stroke="#D9A62E"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
