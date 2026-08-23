import RappelsClient from "./RappelsClient";

export const metadata = {
  title: "Rappels constructeur par marque — Avant Mon CT",
  description:
    "Vérifiez gratuitement si votre voiture ou moto fait l'objet d'un rappel constructeur officiel, via les données ouvertes RappelConso (DGCCRF).",
  alternates: { canonical: "/rappels" },
  openGraph: {
    title: "Rappels constructeur par marque — Avant Mon CT",
    description:
      "Vérifiez gratuitement si votre voiture ou moto fait l'objet d'un rappel constructeur officiel, via les données ouvertes RappelConso (DGCCRF).",
  },
};

export default async function RappelsPage({ searchParams }) {
  const params = await searchParams;
  return <RappelsClient initialMarque={params?.marque} />;
}
