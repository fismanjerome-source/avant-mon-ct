/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "avant-mon-ct.onrender.com" }],
        destination: "https://avant.creneauct.fr/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Empêche le site d'être affiché dans un cadre invisible sur un autre site (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Empêche le navigateur de deviner le type d'un fichier différemment de ce qu'annonce le serveur.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Force HTTPS pendant 2 ans, y compris pour les sous-domaines, une fois activé.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Limite les informations envoyées aux sites externes lors d'un clic sortant.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Désactive l'accès à la caméra/micro/géolocalisation par défaut pour le site.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
