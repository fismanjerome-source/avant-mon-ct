"use client";

import { useEffect, useRef, useState } from "react";
import { IconCoche, IconListe, IconCle, IconAlerte, IconPin, IconHorloge, IconCalendrier, IconGraphique, IconPersonnes, IconJournal, IconInfo, IconBalance, IconRecu, IconCadenas } from "./UISvgIcons";

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export default function SideMenu() {
  const [ouvert, setOuvert] = useState(false);
  const fermerBtnRef = useRef(null);

  useEffect(() => {
    if (!ouvert) return;
    fermerBtnRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === "Escape") setOuvert(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label="Ouvrir le menu"
        className="hamburger-btn"
      >
        <HamburgerIcon />
      </button>

      {ouvert && (
        <div className="side-menu-overlay" onClick={(e) => e.target === e.currentTarget && setOuvert(false)}>
          <div className="side-menu-panel" role="navigation" aria-label="Menu principal">
            <div className="side-menu-header">
              <span className="side-menu-titre">Menu</span>
              <button ref={fermerBtnRef} type="button" onClick={() => setOuvert(false)} aria-label="Fermer le menu" className="side-menu-close">
                <CloseIcon />
              </button>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Avant le contrôle technique</span>
              <a href="/checklist" onClick={() => setOuvert(false)}><IconCoche /> Ma checklist</a>
              <a href="/points-controle" onClick={() => setOuvert(false)}><IconListe /> Ce qui est vérifié (136 points)</a>
              <a href="/entretien" onClick={() => setOuvert(false)}><IconCle /> Bien l'entretenir</a>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Vérifications</span>
              <a href="/rappels" onClick={() => setOuvert(false)}><IconAlerte /> Un rappel constructeur ?</a>
              <a href="/centres" onClick={() => setOuvert(false)}><IconPin /> Trouver un centre agréé</a>
              <a href="/rappel" onClick={() => setOuvert(false)}><IconHorloge /> Prévenez-moi avant l'échéance</a>
              <a
                href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=side-menu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOuvert(false)}
              >
                <IconCalendrier /> Réserver sur Créneau CT
              </a>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Informations</span>
              <a href="/guide" onClick={() => setOuvert(false)}><IconGraphique /> Guide &amp; chiffres officiels</a>
              <a href="/vente-occasion" onClick={() => setOuvert(false)}><IconPersonnes /> Vendre d'occasion</a>
              <a href="/actualites" onClick={() => setOuvert(false)}><IconJournal /> Quoi de neuf ?</a>
              <a href="/a-propos" onClick={() => setOuvert(false)}><IconInfo /> À propos</a>
              <a href="/mentions-legales" onClick={() => setOuvert(false)}><IconBalance /> Mentions légales</a>
              <a href="/cgu" onClick={() => setOuvert(false)}><IconRecu /> CGU</a>
              <a href="/confidentialite" onClick={() => setOuvert(false)}><IconCadenas /> Confidentialité</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
