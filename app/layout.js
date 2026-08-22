import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// TODO: remplacer par le vrai nom de domaine une fois déployé/acheté.
const SITE_URL = "https://avant-mon-ct.fr";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avant Mon CT — préparez votre contrôle technique gratuitement",
    template: "%s",
  },
  description:
    "Checklist gratuite, rappel d'échéance et guide officiel pour préparer votre contrôle technique et éviter la contre-visite. Chiffres UTAC-OTC 2025.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Avant Mon CT",
    title: "Avant Mon CT — préparez votre contrôle technique gratuitement",
    description:
      "Checklist gratuite, rappel d'échéance et guide officiel du contrôle technique en France, avec les chiffres UTAC-OTC 2025.",
  },
  twitter: {
    card: "summary",
    title: "Avant Mon CT — préparez votre contrôle technique gratuitement",
    description:
      "Checklist gratuite, rappel d'échéance et guide officiel du contrôle technique en France.",
  },
  robots: { index: true, follow: true },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Avant Mon CT",
  url: SITE_URL,
  description:
    "Service gratuit et indépendant d'information sur le contrôle technique automobile en France : checklist, rappel d'échéance, guide et chiffres officiels UTAC-OTC.",
  inLanguage: "fr-FR",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <header className="site">
          <a className="brand" href="/">
            <Logo size={30} />
            Avant Mon CT
          </a>
          <SearchBar />
          <nav>
            <a href="/checklist">Ma checklist</a>
            <a href="/points-controle">Ce qui est vérifié</a>
            <a href="/entretien">Bien l'entretenir</a>
            <a href="/rappels">Un rappel connu ?</a>
            <a href="/centres">Trouver un centre</a>
            <a href="/actualites">Quoi de neuf ?</a>
            <a href="/rappel">Prévenez-moi</a>
            <a
              href="https://creneauct.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-accent"
            >
              Prendre RDV
            </a>
          </nav>
        </header>
        <main id="contenu">{children}</main>
        <footer className="site">
          <div className="wrap">
            <strong>Avant Mon CT</strong>
            <p className="disclaimer">
              Le site gratuit qui vous aide à préparer votre contrôle
              technique, édité par la même équipe que{" "}
              <a href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
                Créneau CT
              </a>
              . N'est ni un centre de contrôle technique, ni affilié à
              l'UTAC-OTC.
            </p>
            <p className="sources">
              Chiffres officiels :{" "}
              <a
                href="https://www.utac-otc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                UTAC-OTC
              </a>{" "}
              (organisme technique central) ·{" "}
              <a
                href="https://www.service-public.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Service-public.fr
              </a>
            </p>
            <p className="sources" style={{ marginTop: "0.4rem" }}>
              <a href="/a-propos">À propos</a> ·{" "}
              <a href="/vente-occasion">Vente d&apos;occasion</a> ·{" "}
              <a href="/mentions-legales">Mentions légales</a> ·{" "}
              <a href="/cgu">CGU</a> ·{" "}
              <a href="/confidentialite">Confidentialité</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
