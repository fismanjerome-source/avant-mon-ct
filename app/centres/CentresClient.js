"use client";

import { useState, useEffect } from "react";

export default function CentresClient({ initialCodePostal }) {
  const [type, setType] = useState("voiture");
  const [codePostal, setCodePostal] = useState(initialCodePostal || "");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function runSearch(cp, t) {
    if (!cp || cp.length < 2) return;
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/centres?codePostal=${encodeURIComponent(cp)}&type=${t}`
      );
      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (initialCodePostal) {
      runSearch(initialCodePostal, type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await runSearch(codePostal, type);
  }

  return (
    <>
      <span className="eyebrow">Annuaire officiel (data.economie.gouv.fr)</span>
      <h1>Trouver un centre de contrôle technique agréé</h1>
      <p className="lede">
        Recherche dans l'annuaire officiel des 6 100+ centres agréés en
        France (DGCCRF), par département.
      </p>

      <div className="info-box danger">
        <strong>Un contrôle technique n'est valable que dans un centre
        agréé.</strong> Tous les centres listés ici sont issus de l'annuaire
        officiel de la DGCCRF. Un contrôle réalisé hors de ce cadre, ou sans
        présentation physique du véhicule, est un faux (article 441-1 du
        Code pénal).
      </div>

      <form
        className="rappel"
        onSubmit={handleSubmit}
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end" }}
      >
        <div>
          <label>Type de véhicule</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              padding: "0.8rem 0.9rem",
              borderRadius: 9,
              border: "1px solid var(--ligne)",
              fontSize: "1rem",
              fontFamily: "inherit",
            }}
          >
            <option value="voiture">Voiture</option>
            <option value="moto">Moto / scooter</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label>Code postal</label>
          <input
            type="text"
            placeholder="75001"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            maxLength={5}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" className="primary" disabled={status === "loading"}>
          {status === "loading" ? "Recherche..." : "Chercher"}
        </button>
      </form>

      {status === "done" && result && (
        <div style={{ marginTop: "2rem" }}>
          <div className="section-title">
            <h2>{result.total} centre{result.total !== 1 ? "s" : ""} dans le département</h2>
          </div>

          {result.centres && result.centres.length === 0 && (
            <div className="result-banner warn">
              Aucun centre trouvé pour ce code postal.
            </div>
          )}

          {result.centres &&
            result.centres.slice(0, 15).map((c, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--ligne)",
                  borderRadius: 12,
                  padding: "1.1rem 1.3rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                  <strong>{c.nom}</strong>
                  {c.reservableSurCreneauCT && (
                    <span className="badge" style={{ whiteSpace: "nowrap" }}>
                      Réservable sur Créneau CT
                    </span>
                  )}
                </div>
                <p style={{ margin: "0.3rem 0", color: "var(--ink-soft)", fontSize: "0.92rem" }}>
                  {c.adresse}, {c.codePostal} {c.commune}
                </p>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem", alignItems: "center" }}>
                  {c.telephone && <span>{c.telephone}</span>}
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      Site web
                    </a>
                  )}
                  {c.reservableSurCreneauCT && (
                    <a
                      href={c.reservableSurCreneauCT}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 700 }}
                    >
                      Prendre RDV
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      <p className="source-note">
        Source : annuaire des centres de contrôle technique, données ouvertes
        DGCCRF (data.economie.gouv.fr).
      </p>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Envie de réserver directement ?</p>
        <p className="sub">
          Trouvez un créneau disponible en quelques clics via Créneau CT.
        </p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=centres" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
