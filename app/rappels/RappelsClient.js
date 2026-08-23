"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MARQUES_VOITURE, MARQUES_MOTO } from "../../lib/vehicules";

export default function RappelsClient() {
  const searchParams = useSearchParams();
  const [type, setType] = useState("voiture");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const marques = type === "moto" ? MARQUES_MOTO : MARQUES_VOITURE;

  async function runSearch(marqueChoisie, modeleChoisi) {
    if (!marqueChoisie) return;
    setStatus("loading");
    try {
      let url = `/api/rappels?marque=${encodeURIComponent(marqueChoisie)}`;
      if (modeleChoisi && modeleChoisi.trim()) {
        url += `&modele=${encodeURIComponent(modeleChoisi.trim())}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    const prefill = searchParams.get("marque");
    if (prefill) {
      const isMoto = MARQUES_MOTO.some((m) => m.toLowerCase() === prefill.toLowerCase());
      setType(isMoto ? "moto" : "voiture");
      setMarque(prefill);
      runSearch(prefill, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await runSearch(marque, modele);
  }

  return (
    <>
      <span className="eyebrow">Données officielles RappelConso (DGCCRF)</span>
      <h1>Votre véhicule fait-il l'objet d'un rappel constructeur ?</h1>
      <p className="lede">
        Recherchez les rappels officiels publiés sur RappelConso.gouv.fr pour
        une marque, et affinez par modèle si besoin. Un rappel signale un
        défaut de sécurité identifié par le constructeur, réparé gratuitement.
      </p>

      <div className="photo-banner" style={{ aspectRatio: "16 / 5" }}>
        <Image
          src="/images/moteur-gros-plan.jpg"
          alt="Gros plan sur un moteur de voiture"
          fill
          sizes="(max-width: 880px) 100vw, 880px"
          style={{ objectFit: "cover" }}
        />
        <span className="caption">Un défaut identifié, une réparation gratuite</span>
        <span className="credit">Photo : Chad Kirchoff / Unsplash</span>
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
            onChange={(e) => {
              setType(e.target.value);
              setMarque("");
            }}
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
        <div style={{ flex: 1, minWidth: 180 }}>
          <label>Marque</label>
          <select
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            required
            style={{
              padding: "0.8rem 0.9rem",
              borderRadius: 9,
              border: "1px solid var(--ligne)",
              fontSize: "1rem",
              width: "100%",
              fontFamily: "inherit",
            }}
          >
            <option value="">Choisir une marque</option>
            {marques.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label>Modèle (optionnel)</label>
          <input
            type="text"
            placeholder="ex. Clio, 208, Master..."
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" className="primary" disabled={status === "loading"}>
          {status === "loading" ? "Recherche..." : "Vérifier les rappels"}
        </button>
      </form>

      {status === "done" && result && (
        <div style={{ marginTop: "2rem" }}>
          <div className="section-title">
            <h2>
              {result.total} rappel{result.total !== 1 ? "s" : ""} trouvé
              {result.total !== 1 ? "s" : ""} pour {marque}
              {modele ? ` — "${modele}"` : ""}
            </h2>
          </div>

          {result.rappels.length === 0 && (
            <div className="result-banner ok">
              Aucun rappel officiel recensé pour {marque}
              {modele ? ` "${modele}"` : ""} dans les données RappelConso
              disponibles.
            </div>
          )}

          {result.rappels.map((r, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--ligne)",
                borderRadius: 12,
                padding: "1.2rem 1.4rem",
                marginBottom: "0.9rem",
                background: "var(--fond)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "0.4rem",
                }}
              >
                <strong>{r.modeles}</strong>
                <span style={{ color: "var(--ink-faint)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                  {r.date ? new Date(r.date).toLocaleDateString("fr-FR") : ""}
                </span>
              </div>
              <p style={{ margin: "0 0 0.6rem", color: "var(--ink-soft)", fontSize: "0.92rem" }}>
                {r.motif}
              </p>
              {r.risque && <span className="badge">Risque : {r.risque}</span>}

              {(r.conduite || r.compensation || r.contact) && (
                <div
                  style={{
                    marginTop: "0.8rem",
                    padding: "0.9rem 1rem",
                    background: "var(--vert-bg)",
                    border: "1px solid var(--vert)",
                    borderRadius: 8,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.4rem",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "var(--vert)",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Que faire ?
                  </p>
                  {r.conduite && (
                    <p style={{ margin: "0 0 0.35rem", fontSize: "0.9rem", color: "var(--ink)" }}>
                      {r.conduite}
                    </p>
                  )}
                  {r.compensation && (
                    <p style={{ margin: "0 0 0.35rem", fontSize: "0.87rem", color: "var(--ink-soft)" }}>
                      <strong>Prise en charge :</strong> {r.compensation}
                    </p>
                  )}
                  {r.contact && (
                    <p style={{ margin: 0, fontSize: "0.87rem", color: "var(--ink-soft)" }}>
                      <strong>Contact :</strong> {r.contact}
                    </p>
                  )}
                </div>
              )}
              {!r.conduite && !r.compensation && !r.contact && (
                <div
                  style={{
                    marginTop: "0.8rem",
                    padding: "0.9rem 1rem",
                    background: "var(--or-bg)",
                    border: "1px solid var(--or)",
                    borderRadius: 8,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.35rem",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "var(--ink)",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Que faire ?
                  </p>
                  <p style={{ margin: 0, fontSize: "0.87rem", color: "var(--ink-soft)" }}>
                    RappelConso ne publie pas de consigne détaillée pour ce
                    rappel précis. La règle générale et sûre pour tout rappel
                    constructeur : contactez votre <strong>concessionnaire {marque}</strong> avec
                    le numéro d'immatriculation de votre véhicule — la vérification
                    et la réparation sont gratuites dans le cadre d'un rappel.
                  </p>
                </div>
              )}

              {r.lien && (
                <div style={{ marginTop: "0.7rem" }}>
                  <a href={r.lien} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem" }}>
                    Voir la fiche officielle complète RappelConso →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="source-note">
        Source : RappelConso V2, données ouvertes publiées par la DGCCRF,
        mises à jour toutes les heures. Le champ modèle filtre sur le texte
        exact publié par le constructeur (parfois plusieurs modèles listés
        ensemble) — laissez-le vide pour voir tous les rappels de la marque.
        Recherche limitée aux 20 rappels les plus récents.
      </p>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Un rappel constructeur sur votre véhicule ?</p>
        <p className="sub">
          Faites-le vérifier lors de votre prochain contrôle technique.
        </p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=rappels" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
