"use client";

import { useState, useEffect, useRef } from "react";
import { MARQUES_VOITURE, MARQUES_MOTO } from "../../lib/vehicules";

const TOUTES_MARQUES = [
  ...MARQUES_VOITURE.map((m) => ({ label: m, type: "marque" })),
  ...MARQUES_MOTO.map((m) => ({ label: m, type: "marque" })),
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [villes, setVilles] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setVilles([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/villes?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : { villes: [] }))
        .then((data) => setVilles(data.villes || []))
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const q = query.trim().toLowerCase();
  const marquesMatch = q
    ? TOUTES_MARQUES.filter((m) => m.label.toLowerCase().includes(q)).slice(0, 5)
    : [];

  function goToMarque(marque) {
    setQuery("");
    setOpen(false);
    window.location.href = `/rappels?marque=${encodeURIComponent(marque)}`;
  }

  function goToVille(ville) {
    setQuery("");
    setOpen(false);
    window.location.href = `/centres?codePostal=${encodeURIComponent(ville.codePostal)}`;
  }

  const hasResults = marquesMatch.length > 0 || villes.length > 0;

  return (
    <div
      ref={boxRef}
      className="search-bar-wrap"
      style={{ position: "relative", width: "100%", maxWidth: 320 }}
    >
      <div style={{ position: "relative" }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Une ville, une marque..."
          style={{
            width: "100%",
            padding: "0.55rem 0.8rem 0.55rem 2.2rem",
            border: "1px solid var(--ligne)",
            borderRadius: 999,
            fontFamily: "inherit",
            fontSize: "0.88rem",
            background: "var(--fond-alt)",
            color: "var(--ink)",
          }}
        />
      </div>

      {open && q.length >= 2 && (
        <div
          style={{
            position: "absolute",
            top: "115%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid var(--ligne)",
            borderRadius: 12,
            boxShadow: "var(--shadow-md)",
            zIndex: 30,
            maxHeight: 340,
            overflowY: "auto",
          }}
        >
          {!hasResults && (
            <div style={{ padding: "0.9rem 1rem", fontSize: "0.85rem", color: "var(--ink-faint)" }}>
              Aucun résultat pour "{query}".
            </div>
          )}

          {marquesMatch.length > 0 && (
            <div>
              <div style={{ padding: "0.6rem 1rem 0.2rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase" }}>
                Marques
              </div>
              {marquesMatch.map((m) => (
                <div
                  key={m.label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToMarque(m.label)}
                  style={{ padding: "0.6rem 1rem", cursor: "pointer", fontSize: "0.92rem", borderBottom: "1px solid var(--ligne)" }}
                >
                  Rappels constructeur — <strong>{m.label}</strong>
                </div>
              ))}
            </div>
          )}

          {villes.length > 0 && (
            <div>
              <div style={{ padding: "0.6rem 1rem 0.2rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase" }}>
                Villes
              </div>
              {villes.map((v, i) => (
                <div
                  key={`${v.nom}-${i}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToVille(v)}
                  style={{ padding: "0.6rem 1rem", cursor: "pointer", fontSize: "0.92rem", borderBottom: "1px solid var(--ligne)" }}
                >
                  Centres près de <strong>{v.nom}</strong>{" "}
                  <span style={{ color: "var(--ink-faint)" }}>({v.codePostal})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
