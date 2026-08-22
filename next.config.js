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
};

module.exports = nextConfig;
