"use client";

import { useState, useEffect, useRef } from "react";

export default function CentresClient({ initialCodePostal }) {
  const [type, setType] = useState("voiture");
  const [codePostal, setCodePostal] = useState(initialCodePostal || "");
  const [query, setQuery] = useState(initialCodePostal || "");
  const [villes, setVilles] = useState([]);
  const [dropdownOuvert, setDropdownOuvert] = useState(false);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [libelleRecherche, setLibelleRecherche] = useState("");
  const [coords, setCoords] = useState(null); // { lat, lon } de la ville choisie
  const boxRef = useRef(null);

  async function runSearch(cp, t, coordonnees) {
    if (!cp || cp.length < 2) return;
    setStatus("loading");
    try {
      let url = `/api/centres?codePostal=${encodeURIComponent(cp)}&type=${t}`;
      if (coordonnees) {
        url += `&lat=${coordonnees.lat}&lon=${coordonnees.lon}`;
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
    if (initialCodePostal) {
      runSearch(initialCodePostal, type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autocomplétion des villes (même source que la recherche du header).
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || q === `${codePostal}`) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setDropdownOuvert(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function choisirVille(ville) {
    setQuery(`${ville.nom} (${ville.codePostal})`);
    setCodePostal(ville.codePostal);
    setCoords(ville.lat != null && ville.lon != null ? { lat: ville.lat, lon: ville.lon } : null);
    setLibelleRecherche(`${ville.nom} (${ville.codePostal})`);
    setVilles([]);
    setDropdownOuvert(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Code postal déjà résolu par un choix dans la liste, ou saisi directement.
    const cp = /^\d{5}$/.test(query.trim()) ? query.trim() : codePostal;
    if (!/^\d{5}$/.test(cp)) {
      // Rien de sélectionné et le texte tapé n'est pas un code postal :
      // on prend la première suggestion affichée par dépit, sinon on abandonne.
      if (villes[0]) return choisirVilleEtChercher(villes[0]);
      return;
    }
    setCodePostal(cp);
    setDropdownOuvert(false);
    // Garde le libellé "Ville (code postal)" déjà connu s'il correspond
    // encore à ce code, plutôt que de le remplacer par le code postal nu.
    setLibelleRecherche((prev) => (prev && prev.includes(cp) ? prev : cp));
    // Un code postal tapé à la main (sans passer par la liste) n'a pas de
    // coordonnées : le tri retombe sur le rapprochement par code postal.
    const coordonneesValides = query.trim() === `${cp}` ? null : coords;
    await runSearch(cp, type, coordonneesValides);
  }

  async function choisirVilleEtChercher(ville) {
    choisirVille(ville);
    setLibelleRecherche(`${ville.nom} (${ville.codePostal})`);
    const coordonnees = ville.lat != null && ville.lon != null ? { lat: ville.lat, lon: ville.lon } : null;
    await runSearch(ville.codePostal, type, coordonnees);
  }

  return (
    <>
      <span className="eyebrow">Annuaire officiel (data.economie.gouv.fr)</span>
      <h1>Trouver un centre de contrôle technique agréé</h1>
      <p className="lede">
        Recherche dans l'annuaire officiel des 6 100+ centres agréés en
        France (DGCCRF), par département.
      </p>

      <div className="info-box important">
        <strong>Un contrôle technique n'est valable que dans un centre
        agréé.</strong> Tous les centres listés ici sont issus de l'annuaire
        officiel de la DGCCRF. Un contrôle réalisé hors de ce cadre, ou sans
        présentation physique du véhicule, est un faux (article 441-1 du
        code pénal).
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
        <div ref={boxRef} style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <label htmlFor="ville-ou-cp">Ville ou code postal</label>
          <input
            id="ville-ou-cp"
            type="text"
            placeholder="Rouen, Lyon, 75001..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCodePostal("");
              setDropdownOuvert(true);
            }}
            onFocus={() => setDropdownOuvert(true)}
            autoComplete="off"
            required
            style={{ width: "100%" }}
          />

          {dropdownOuvert && villes.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "0.3rem",
                background: "white",
                border: "1px solid var(--ligne)",
                borderRadius: 12,
                boxShadow: "var(--shadow-md)",
                zIndex: 30,
                maxHeight: 280,
                overflowY: "auto",
              }}
            >
              {villes.map((v, i) => (
                <div
                  key={`${v.nom}-${v.codePostal}-${i}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choisirVille(v)}
                  style={{
                    padding: "0.6rem 1rem",
                    cursor: "pointer",
                    fontSize: "0.92rem",
                    borderBottom: i < villes.length - 1 ? "1px solid var(--ligne)" : "none",
                  }}
                >
                  <strong>{v.nom}</strong>{" "}
                  <span style={{ color: "var(--ink-faint)" }}>({v.codePostal})</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="primary" disabled={status === "loading"}>
          {status === "loading" ? "Recherche..." : "Chercher"}
        </button>
      </form>

      {status === "done" && result && (
        <div style={{ marginTop: "2rem" }}>
          <div className="section-title">
            <h2>
              {result.total} centre{result.total !== 1 ? "s" : ""} dans le département
              {libelleRecherche ? ` (recherche : ${libelleRecherche})` : ""}
            </h2>
          </div>
          {result.centres?.[0]?.distanceKm != null && (
            <p style={{ marginTop: "-0.5rem", marginBottom: "1rem", color: "var(--ink-faint)", fontSize: "0.88rem" }}>
              Triés du plus proche au plus éloigné de {libelleRecherche.split(" (")[0]}.
            </p>
          )}

          {result.centres && result.centres.length === 0 && (
            <div className="result-banner warn">
              Aucun centre trouvé pour ce code postal.
            </div>
          )}

          {result.centres &&
            result.centres.slice(0, 15).map((c, i) => (
              <div key={i} className="centre-resultat">
                <span className="centre-resultat-rang">{i + 1}</span>
                <div className="centre-resultat-corps">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <strong>{c.nom}</strong>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {c.distanceKm != null && (
                        <span className="centre-resultat-distance">📍 {c.distanceKm} km</span>
                      )}
                      {c.reservableSurCreneauCT && (
                        <span className="badge" style={{ whiteSpace: "nowrap" }}>
                          Réservable sur Créneau CT
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ margin: "0.3rem 0", color: "var(--ink-soft)", fontSize: "0.92rem" }}>
                    {c.adresse}, {c.codePostal} {c.commune}
                  </p>
                  <div className="centre-resultat-contact">
                    {c.telephone && <span>📞 {c.telephone}</span>}
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        🌐 Site web
                      </a>
                    )}
                    {c.reservableSurCreneauCT && (
                      <a
                        href={c.reservableSurCreneauCT}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--or)" }}
                      >
                        📅 Prendre RDV
                      </a>
                    )}
                  </div>
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
