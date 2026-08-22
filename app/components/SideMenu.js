"use client";

import { useState } from "react";

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
              <button type="button" onClick={() => setOuvert(false)} aria-label="Fermer le menu" className="side-menu-close">
                <CloseIcon />
              </button>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Avant le contrôle technique</span>
              <a href="/checklist" onClick={() => setOuvert(false)}>✅ Ma checklist</a>
              <a href="/points-controle" onClick={() => setOuvert(false)}>📋 Ce qui est vérifié (136 points)</a>
              <a href="/entretien" onClick={() => setOuvert(false)}>🔧 Bien l'entretenir</a>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Vérifications</span>
              <a href="/rappels" onClick={() => setOuvert(false)}>⚠️ Un rappel constructeur ?</a>
              <a href="/centres" onClick={() => setOuvert(false)}>📍 Trouver un centre agréé</a>
              <a href="/rappel" onClick={() => setOuvert(false)}>⏰ Prévenez-moi avant l'échéance</a>
            </div>

            <div className="side-menu-section">
              <span className="side-menu-section-titre">Informations</span>
              <a href="/guide" onClick={() => setOuvert(false)}>📊 Guide &amp; chiffres officiels</a>
              <a href="/vente-occasion" onClick={() => setOuvert(false)}>🤝 Vendre d'occasion</a>
              <a href="/actualites" onClick={() => setOuvert(false)}>📰 Quoi de neuf ?</a>
              <a href="/a-propos" onClick={() => setOuvert(false)}>ℹ️ À propos</a>
              <a href="/mentions-legales" onClick={() => setOuvert(false)}>⚖️ Mentions légales</a>
              <a href="/cgu" onClick={() => setOuvert(false)}>📄 CGU</a>
              <a href="/confidentialite" onClick={() => setOuvert(false)}>🔒 Confidentialité</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
