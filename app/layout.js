import { Outfit, DM_Sans, Fira_Code } from "next/font/google";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import SideMenu from "./components/SideMenu";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://avant.creneauct.fr";

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
      className={`${outfit.variable} ${dmSans.variable} ${firaCode.variable}`}
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
          <SideMenu />
          <a className="brand" href="/">
            <Logo size={30} />
            Avant Mon CT
          </a>
          <SearchBar />
          <nav>
            <a href="/checklist">Ma checklist</a>
            <a href="/centres">Trouver un centre</a>
            <a href="/rappels">Un rappel connu ?</a>
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
              Un site gratuit pour préparer votre contrôle technique, édité
              par la même équipe que{" "}
              <a href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
                Créneau CT
              </a>
              . Il reste toutefois indépendant des organismes officiels :
              ce n'est ni un centre de contrôle technique, ni un site
              affilié à l'UTAC-OTC.
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
            <nav className="footer-links">
              <a href="/points-controle">Ce qui est vérifié</a>
              <a href="/entretien">Bien l'entretenir</a>
              <a href="/actualites">Quoi de neuf ?</a>
              <a href="/rappel">Prévenez-moi avant l'échéance</a>
              <a href="/vente-occasion">Vendre d&apos;occasion</a>
              <a href="/a-propos">À propos</a>
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/cgu">CGU</a>
              <a href="/confidentialite">Confidentialité</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
