import { Suspense } from "react";
import CentresClient from "./CentresClient";

export const metadata = {
  title: "Trouver un centre de contrôle technique agréé — Avant Mon CT",
  description:
    "Recherchez un centre de contrôle technique agréé près de chez vous, voiture ou moto, via l'annuaire officiel DGCCRF.",
  alternates: { canonical: "/centres" },
};

export default function CentresPage() {
  return (
    <Suspense fallback={null}>
      <CentresClient />
    </Suspense>
  );
}
