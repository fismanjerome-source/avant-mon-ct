"use client";

import { useState } from "react";
import { FONCTIONS_VOITURE, FONCTIONS_MOTO } from "../../lib/pointsControle";

export default function PointsControleClient() {
  const [type, setType] = useState("voiture");
  const [ouvert, setOuvert] = useState(null);

  const fonctions = type === "voiture" ? FONCTIONS_VOITURE : FONCTIONS_MOTO;
  const total = type === "voiture" ? "136" : "environ 80";

  function toggle(id) {
    setOuvert((prev) => (prev === id ? null : id));
  }

  function switchType(newType) {
    setType(newType);
    setOuvert(null);
  }

  return (
    <>
      <span className="eyebrow">Réglementation officielle — arrêté du 18 juin 1991 modifié</span>
      <h1>
        Les {type === "voiture" ? "136" : "80"} points du contrôle technique
      </h1>
      <p className="lede">
        Le contrôle technique {type === "voiture" ? "voiture" : "moto"} vérifie{" "}
        {total} points, classés officiellement en 9 fonctions. Cliquez sur une
        fonction pour voir des exemples de ce qui est vérifié.
      </p>

      <div style={{ display: "flex", gap: "0.6rem", margin: "1.25rem 0 2rem" }}>
        <button
          type="button"
          className="primary"
          onClick={() => switchType("voiture")}
          style={{
            background: type === "voiture" ? "var(--bleu-900)" : "white",
            color: type === "voiture" ? "white" : "var(--ink)",
            border: "1px solid var(--ligne)",
          }}
        >
          Voiture (136 points)
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => switchType("moto")}
          style={{
            background: type === "moto" ? "var(--bleu-900)" : "white",
            color: type === "moto" ? "white" : "var(--ink)",
            border: "1px solid var(--ligne)",
          }}
        >
          Moto / scooter (~80 points)
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {fonctions.map((f, i) => (
          <div
            key={f.id}
            style={{
              border: "1px solid var(--ligne)",
              borderRadius: 10,
              overflow: "hidden",
              background: "var(--fond)",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(f.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1rem 1.2rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--or)",
                    width: 24,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong style={{ fontSize: "1rem", color: "var(--bleu-900)" }}>{f.nom}</strong>
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "var(--ink-faint)",
                  transform: ouvert === f.id ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              >
                +
              </span>
            </button>

            {ouvert === f.id && (
              <div
                style={{
                  padding: "0 1.2rem 1.2rem 3.2rem",
                  animation: "fadeInUp 0.25s ease both",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--ink-soft)" }}>
                  {f.points.map((p) => (
                    <li key={p} style={{ marginBottom: "0.4rem", fontSize: "0.92rem" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="source-note" style={{ marginTop: "1.5rem" }}>
        Exemples de points par fonction, non exhaustifs — le nombre exact de
        points par fonction n'est pas publié en détail par l'organisme
        officiel. Classification officielle en 9 fonctions selon l'arrêté du
        18 juin 1991 modifié. Pour la liste complète et à jour, consultez{" "}
        <a href="https://www.utac-otc.com" target="_blank" rel="noopener noreferrer">
          utac-otc.com
        </a>
        .
      </p>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <a className="card" href="/checklist">
          <h3>Faire la checklist</h3>
          <p>Vérifiez chez vous les points responsables de la majorité des échecs.</p>
        </a>
        <a className="card" href="/entretien">
          <h3>Guide d'entretien</h3>
          <p>Entretien quotidien, révisions, hiver, été — pour garder un véhicule conforme.</p>
        </a>
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Prêt à passer votre contrôle technique ?</p>
        <p className="sub">Trouvez un créneau disponible près de chez vous.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
