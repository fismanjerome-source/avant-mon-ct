import ChecklistClient from "./ChecklistClient";

export const metadata = {
  title: "Checklist gratuite avant contrôle technique — Avant Mon CT",
  description:
    "Les points à vérifier avant votre contrôle technique : éclairage, freins, pneus, pollution, suspension. Évitez 89% des motifs de contre-visite en 10 minutes.",
  alternates: { canonical: "/checklist" },
  openGraph: {
    title: "Checklist gratuite avant contrôle technique — Avant Mon CT",
    description:
      "Les points à vérifier avant votre contrôle technique : éclairage, freins, pneus, pollution, suspension. Évitez 89% des motifs de contre-visite en 10 minutes.",
  },
};

export default function ChecklistPage() {
  return <ChecklistClient />;
}
