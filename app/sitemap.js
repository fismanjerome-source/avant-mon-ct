const SITE_URL = "https://avant.creneauct.fr";

export default function sitemap() {
  const routes = [
    "",
    "/checklist",
    "/points-controle",
    "/entretien",
    "/vente-occasion",
    "/guide",
    "/rappel",
    "/rappels",
    "/centres",
    "/actualites",
    "/a-propos",
  ];
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
