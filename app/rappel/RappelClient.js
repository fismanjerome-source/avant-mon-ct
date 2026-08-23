"use client";

import { useState } from "react";

export default function RappelClient() {
  const [plaque, setPlaque] = useState("");
  const [email, setEmail] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rappel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaque, email, dateEcheance }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setPlaque("");
      setEmail("");
      setDateEcheance("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <span className="eyebrow">Service gratuit</span>
      <h1>Rappel gratuit de votre contrôle technique</h1>
      <p className="lede">
        Recevez un email avant la date limite de votre prochain contrôle
        technique, pour éviter l'amende de 135€ en cas de dépassement.
      </p>

      <form className="rappel" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="plaque">Plaque d'immatriculation</label>
          <input
            id="plaque"
            type="text"
            placeholder="AA-123-AA"
            value={plaque}
            onChange={(e) => setPlaque(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="vous@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date d'échéance du contrôle technique</label>
          <input
            id="date"
            type="date"
            value={dateEcheance}
            onChange={(e) => setDateEcheance(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary" disabled={status === "loading"}>
          {status === "loading" ? "Envoi..." : "Activer le rappel"}
        </button>
        {status === "ok" && (
          <p style={{ color: "var(--vert)" }}>
            Rappel enregistré. Vous recevrez un email avant l'échéance.
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "var(--rouge)" }}>
            Une erreur est survenue, réessayez.
          </p>
        )}
      </form>

      <div className="cta-ct">
        <div className="texte">
        <p className="title">Pas envie d'attendre l'échéance ?</p>
        <p className="sub">Réservez votre contrôle technique dès maintenant.</p>
        </div>
        
        <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=rappel" target="_blank" rel="noopener noreferrer">
          Prendre RDV sur Créneau CT
        </a>
      </div>
    </>
  );
}
