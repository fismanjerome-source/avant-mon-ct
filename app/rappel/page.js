import RappelClient from "./RappelClient";

export const metadata = {
  title: "Rappel gratuit d'échéance du contrôle technique — Avant Mon CT",
  description:
    "Recevez un email gratuit avant la date limite de votre contrôle technique et évitez l'amende de 135€ pour contrôle technique périmé.",
  alternates: { canonical: "/rappel" },
};

export default function RappelPage() {
  return <RappelClient />;
}
