"use client";

import { useState } from "react";
import Image from "next/image";

const POINTS_VOITURE = [
  {
    id: "eclairage",
    label: "Éclairage et signalisation",
    detail:
      "Feux de croisement, route, position, stop, clignotants et plaque : tous allumés, sans fissure. Remplacez toute ampoule grillée avant de vous présenter.",
    part: 28,
  },
  {
    id: "freinage",
    label: "Freinage",
    detail: "Pas de bruit anormal au freinage, pédale ferme, pas de fuite de liquide de frein.",
    part: 22,
  },
  {
    id: "pollution",
    label: "Pollution et échappement",
    detail: "Pas de fumée visible anormale à l'échappement, pas de voyant moteur allumé au tableau de bord.",
    part: 18,
  },
  {
    id: "pneus",
    label: "Pneumatiques",
    detail: "Profondeur de sculpture au-dessus de 1,6 mm, pression correcte, pas de hernie ni de déchirure.",
    part: 12,
  },
  {
    id: "suspension",
    label: "Direction et suspension",
    detail: "Pas de bruit de cognement, véhicule stable dans les virages, pas de jeu excessif au volant.",
    part: 10,
  },
  {
    id: "liquides",
    label: "Niveaux de liquides",
    detail: "Huile moteur, liquide de frein, liquide de direction assistée et lave-glace à niveau.",
    part: null,
  },
  {
    id: "vitres",
    label: "Pare-brise et essuie-glaces",
    detail: "Aucune fissure de plus de 30 cm ni dans le champ de vision du conducteur, essuie-glaces fonctionnels.",
    part: null,
  },
  {
    id: "interieur",
    label: "Intérieur et ceintures",
    detail: "Sièges bien fixés, ceintures en bon état. Retirez tout siège bébé : l'inspecteur n'est pas autorisé à le faire.",
    part: null,
  },
  {
    id: "papiers",
    label: "Documents",
    detail: "Carte grise à jour, plaques d'immatriculation présentes, propres et lisibles.",
    part: null,
  },
];

const POINTS_MOTO = [
  {
    id: "eclairage",
    label: "Éclairage et signalisation",
    detail: "Feu de croisement, route, stop, clignotants, feu de plaque : tous fonctionnels.",
    part: null,
  },
  {
    id: "freinage",
    label: "Freinage",
    detail: "Disques et plaquettes en bon état, pas de fuite de liquide, levier et pédale de frein fermes.",
    part: null,
  },
  {
    id: "pollution",
    label: "Pollution et bruit",
    detail: "Pas de fumée anormale à l'échappement. Le contrôle du bruit (sonomètre) se renforce en 2026.",
    part: null,
  },
  {
    id: "pneus",
    label: "Pneumatiques",
    detail: "Profondeur de sculpture suffisante, pas de déformation, pression correcte.",
    part: null,
  },
  {
    id: "transmission",
    label: "Chaîne / transmission",
    detail: "Tension correcte, pas d'usure excessive, lubrification visible, carter de chaîne présent.",
    part: null,
  },
  {
    id: "fourche",
    label: "Fourche et amortisseurs",
    detail: "Pas de fuite d'huile, pas de jeu anormal, bon maintien de la direction.",
    part: null,
  },
  {
    id: "gardeboue",
    label: "Garde-boue et carrosserie",
    detail: "Fixations solides, pas d'élément coupant ou saillant, rétroviseurs présents et réglables.",
    part: null,
  },
  {
    id: "celerometre",
    label: "Vitesse maximale (50 cm³)",
    detail: "Pour les cyclomoteurs 50cc : depuis le 1er mars 2026, la vitesse réelle est vérifiée au céléromètre.",
    part: null,
  },
  {
    id: "papiers",
    label: "Documents",
    detail: "Carte grise à jour, plaque d'immatriculation présente, propre et lisible.",
    part: null,
  },
];

export default function ChecklistClient() {
  const [type, setType] = useState("voiture");
  const [checked, setChecked] = useState({});

  const POINTS = type === "moto" ? POINTS_MOTO : POINTS_VOITURE;

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function switchType(newType) {
    setType(newType);
    setChecked({});
  }

  const total = POINTS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const allDone = done === total;
  const pct = Math.round((done / total) * 100);

  return (
    <>
      <span className="eyebrow">Checklist gratuite</span>
      <h1>Vérifiez votre véhicule avant le contrôle technique</h1>

      <div style={{ display: "flex", gap: "0.6rem", margin: "1.25rem 0 1.5rem" }}>
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
          Voiture
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
          Moto / scooter
        </button>
      </div>

      <p className="lede">
        {type === "voiture"
          ? "Ces 5 premiers points expliquent à eux seuls la grande majorité des contre-visites prescrites en France (bilan UTAC-OTC 2025)."
          : "Le contrôle technique moto porte sur environ 80 points, dont 25 spécifiques aux deux-roues (chaîne, fourche, garde-boue). Périodicité : tous les 3 ans."}{" "}
        Cochez chaque point une fois vérifié, en environ 10 minutes.
      </p>

      <div className="photo-grid">
        {type === "moto" ? (
          <>
            <div className="photo-card">
              <Image
                src="/images/phare-moto.jpg"
                alt="Gros plan sur le phare d'une moto, éclairage à vérifier"
                fill
                sizes="(max-width: 600px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
              <span className="tag-photo">Éclairage</span>
            </div>
            <div className="photo-card">
              <Image
                src="/images/moteur-moto.jpg"
                alt="Gros plan sur le moteur d'une moto"
                fill
                sizes="(max-width: 600px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
              <span className="tag-photo">Moteur &amp; transmission</span>
            </div>
          </>
        ) : (
          <>
            <div className="photo-card">
              <Image
                src="/images/phare-moteur-audi.jpg"
                alt="Compartiment moteur et phare d'une voiture, éclairage à vérifier"
                fill
                sizes="(max-width: 600px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
              <span className="tag-photo">Éclairage &amp; moteur</span>
            </div>
            <div className="photo-card">
              <Image
                src="/images/inspection-sous-voiture.jpg"
                alt="Deux personnes inspectant le dessous d'une voiture"
                fill
                sizes="(max-width: 600px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
              <span className="tag-photo">Vérification visuelle</span>
            </div>
          </>
        )}
      </div>

      <div className="checklist-progress">
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>

      {POINTS.map((point) => (
        <label
          key={point.id}
          className={`checklist-item${checked[point.id] ? " checked" : ""}`}
        >
          <input
            type="checkbox"
            checked={!!checked[point.id]}
            onChange={() => toggle(point.id)}
          />
          <span className="label">
            <span className="row">
              <strong>{point.label}</strong>
              {point.part ? (
                <span className="badge">{point.part}% des échecs</span>
              ) : null}
            </span>
            <span className="detail">{point.detail}</span>
          </span>
        </label>
      ))}

      <div className={`result-banner ${allDone ? "ok" : "warn"}`}>
        {allDone
          ? "Tout est vérifié : vous êtes prêt pour votre contrôle technique."
          : `${done}/${total} points vérifiés (${pct}%). Continuez avant d'y aller.`}
      </div>

      <p className="source-note">
        Répartition des principaux motifs de contre-visite (voiture) :
        chiffres couramment publiés par les professionnels du secteur, à
        recouper avec le bilan annuel de l'UTAC-OTC. Points de contrôle moto :
        réglementation du contrôle technique catégorie L, 2026.
      </p>

      <div className="card-grid" style={{ marginTop: "1.5rem" }}>
        <a className="card" href="/rappels">
          <h3>Vérifier les rappels constructeur</h3>
          <p>Voyez si votre marque fait l'objet d'un rappel officiel (RappelConso).</p>
        </a>
        <a className="card" href="/centres">
          <h3>Trouver un centre agréé</h3>
          <p>Cherchez un centre près de chez vous dans l'annuaire officiel.</p>
        </a>
      </div>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Prêt à passer votre contrôle technique ?</p>
        <p className="sub">Trouvez un créneau disponible près de chez vous.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=checklist" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
