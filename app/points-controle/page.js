import PointsControleClient from "./PointsControleClient";
import { FONCTIONS_VOITURE } from "../../lib/pointsControle";

export const metadata = {
  title: "Les 136 points du contrôle technique (voiture et moto) — Avant Mon CT",
  description:
    "La liste complète et organisée des points vérifiés au contrôle technique : 136 points pour une voiture, environ 80 pour une moto, classés par fonction officielle.",
  alternates: { canonical: "/points-controle" },
  openGraph: {
    title: "Les 136 points du contrôle technique (voiture et moto) — Avant Mon CT",
    description:
      "La liste complète et organisée des points vérifiés au contrôle technique : 136 points pour une voiture, environ 80 pour une moto, classés par fonction officielle.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Les 9 fonctions du contrôle technique voiture (136 points)",
  itemListElement: FONCTIONS_VOITURE.map((f, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: f.nom,
    description: f.points.join(" ; "),
  })),
};

export default function PointsControlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PointsControleClient />
    </>
  );
}
