"use client";

import { useState } from "react";
import { DEPARTEMENTS, VIEWBOX } from "../../lib/departementsFrance";

const POINTS = [
  { code: "95", nom: "Val-d'Oise", taux: "9,78%", niveau: "le plus bas (France)", sens: "bas" },
  { code: "35", nom: "Ille-et-Vilaine", taux: "27,65%", niveau: "le plus élevé, voitures", sens: "haut" },
  { code: "44", nom: "Loire-Atlantique", taux: "33,17%", niveau: "le plus élevé, utilitaires", sens: "haut" },
];

const DONNEES = new Map(POINTS.map((p) => [p.code, p]));

function couleurDept(code, survole) {
  const p = DONNEES.get(code);
  const base = p ? (p.sens === "bas" ? "var(--vert)" : "var(--orange)") : "var(--carte-fond)";
  if (!survole) return base;
  return p ? base : "var(--carte-fond-survol)";
}

export default function FranceMap() {
  const [survol, setSurvol] = useState(null); // { code, nom, x, y }

  const donneeSurvolee = survol ? DONNEES.get(survol.code) : null;

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={VIEWBOX}
        style={{ width: "100%", height: "auto", maxWidth: 460, display: "block", margin: "0 auto", cursor: "pointer" }}
        onMouseLeave={() => setSurvol(null)}
      >
        <defs>
          <filter id="carte-ombre" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="var(--bleu-900)" floodOpacity="0.25" />
          </filter>
        </defs>
        <g filter="url(#carte-ombre)">
        {DEPARTEMENTS.map((dep) => (
          <path
            key={dep.code}
            d={dep.d}
            fill={couleurDept(dep.code, survol && survol.code === dep.code)}
            stroke="var(--fond)"
            strokeWidth={survol && survol.code === dep.code ? "1.4" : "0.8"}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
              setSurvol({
                code: dep.code,
                nom: dep.nom,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
              setSurvol((prev) =>
                prev && prev.code === dep.code
                  ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }
                  : prev
              );
            }}
          />
        ))}
        </g>
      </svg>

      {survol && (
        <div
          style={{
            position: "absolute",
            left: survol.x,
            top: survol.y,
            transform: "translate(-50%, -115%)",
            background: "var(--bleu-900)",
            color: "white",
            padding: "0.5rem 0.8rem",
            borderRadius: 8,
            fontSize: "0.82rem",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "var(--shadow-md)",
            zIndex: 5,
          }}
        >
          <strong>
            {survol.nom} ({survol.code})
          </strong>
          <br />
          {donneeSurvolee ? (
            <span style={{ fontFamily: "var(--font-mono)" }}>
              {donneeSurvolee.taux} · {donneeSurvolee.niveau}
            </span>
          ) : (
            <span style={{ color: "var(--ink-faint)" }}>Donnée non disponible</span>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.25rem" }}>
        {POINTS.map((p) => (
          <div
            key={p.code}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.7rem 1rem",
              border: "1px solid var(--ligne)",
              borderRadius: 8,
              background: "var(--fond)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: p.sens === "bas" ? "var(--vert)" : "var(--orange)",
                  flexShrink: 0,
                }}
              />
              <strong style={{ fontSize: "0.92rem" }}>{p.nom}</strong>
              <span style={{ color: "var(--ink-faint)", fontSize: "0.82rem" }}>· {p.niveau}</span>
            </span>
            <span className="num" style={{ fontSize: "1.1rem" }}>
              {p.taux}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
