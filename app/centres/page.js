import CentresClient from "./CentresClient";

export const metadata = {
  title: "Trouver un centre de contrôle technique agréé — Avant Mon CT",
  description:
    "Recherchez un centre de contrôle technique agréé près de chez vous, voiture ou moto, via l'annuaire officiel DGCCRF.",
  alternates: { canonical: "/centres" },
  openGraph: {
    title: "Trouver un centre de contrôle technique agréé — Avant Mon CT",
    description:
      "Recherchez un centre de contrôle technique agréé près de chez vous, voiture ou moto, via l'annuaire officiel DGCCRF.",
  },
};

export default async function CentresPage({ searchParams }) {
  const params = await searchParams;
  return <CentresClient initialCodePostal={params?.codePostal} />;
}
