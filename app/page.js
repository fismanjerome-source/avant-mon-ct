import Image from "next/image";
import { PhoneIcon, MailIcon, WhatsAppIcon, SmsIcon } from "./components/ContactIcons";

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <span className="eyebrow">🚗 Avant d'aller au contrôle technique</span>
          <h1>Évitez la contre-visite — 10 minutes de vérification chez vous suffisent</h1>
          <p className="lead">
            Checklist, rappels constructeur, centres agréés près de chez vous :
            tout ce qu'il faut savoir avant votre contrôle technique, gratuit et
            sans compte à créer.
          </p>

          <div className="contact-humain">
            <span className="contact-humain-label">
              Une question sur votre contrôle technique ? Un vrai contact,
              celui de Créneau CT :
            </span>
            <div className="contact-humain-boutons">
              <a href="tel:+33608129145" className="contact-btn">
                <PhoneIcon size={16} />
                06 08 12 91 45
              </a>
              <a href="sms:+33608129145" className="contact-btn">
                <SmsIcon size={16} />
                SMS
              </a>
              <a
                href="https://wa.me/33608129145"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-whatsapp"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
              <a href="mailto:contact@creneauct.fr" className="contact-btn">
                <MailIcon size={16} />
                contact@creneauct.fr
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="stat-strip">
          <div className="stat">
            <span className="num">27,6 M</span>
            <span className="cap">contrôles réalisés en France en 2025</span>
          </div>
          <div className="stat">
            <span className="num">18,94%</span>
            <span className="cap">repartent avec une contre-visite</span>
          </div>
          <div className="stat">
            <span className="num">6 109</span>
            <span className="cap">centres agréés référencés</span>
          </div>
          <div className="stat">
            <span className="num">135€</span>
            <span className="cap">l'amende si le CT est expiré</span>
          </div>
        </div>

        <div className="photo-banner">
          <Image
            src="/images/mecanicien-moteur.jpg"
            alt="Mécanicien inspectant le moteur d'une voiture avant contrôle technique"
            fill
            sizes="(max-width: 880px) 100vw, 880px"
            style={{ objectFit: "cover" }}
            priority
          />
          <span className="caption">Un défaut vu à temps, c'est une contre-visite évitée</span>
          <span className="credit">Photo : Kate Ibragimova / Unsplash</span>
        </div>

        <div className="section-title">
          <h2>Les outils gratuits</h2>
        </div>

        <div className="card-grid">
          <a className="card" href="/checklist">
            <span className="icon">✅</span>
            <h3>Checklist avant CT</h3>
            <p>
              Voiture ou moto : vérifiez les points responsables de la
              majorité des échecs, en 10 minutes.
            </p>
            <span className="tag">Commencer la checklist →</span>
          </a>

          <a className="card" href="/points-controle">
            <span className="icon">📋</span>
            <h3>Les 136 points de contrôle</h3>
            <p>
              La liste complète, classée par fonction officielle, pour
              voiture et moto.
            </p>
            <span className="tag">Voir tous les points →</span>
          </a>

          <a className="card" href="/entretien">
            <span className="icon">🔧</span>
            <h3>Guide d'entretien</h3>
            <p>
              Quotidien, révisions, conduite, hiver, été — les bons réflexes
              toute l'année.
            </p>
            <span className="tag">Consulter le guide →</span>
          </a>

          <a className="card" href="/rappels">
            <span className="icon">⚠️</span>
            <h3>Rappels constructeur</h3>
            <p>
              Votre marque fait-elle l'objet d'un rappel officiel ? Recherche
              en direct dans RappelConso (DGCCRF).
            </p>
            <span className="tag">Vérifier ma marque →</span>
          </a>

          <a className="card" href="/centres">
            <span className="icon">📍</span>
            <h3>Centres agréés</h3>
            <p>
              Trouvez un centre près de chez vous dans l'annuaire officiel
              des 6 100+ centres agréés en France.
            </p>
            <span className="tag">Chercher un centre →</span>
          </a>

          <a className="card" href="/rappel">
            <span className="icon">⏰</span>
            <h3>Rappel d'échéance</h3>
            <p>
              Un email avant la date limite de votre contrôle technique,
              pour éviter l'amende de 135€.
            </p>
            <span className="tag">Activer un rappel →</span>
          </a>

          <a className="card" href="/vente-occasion">
            <span className="icon">🤝</span>
            <h3>Vendre une voiture d'occasion</h3>
            <p>
              La règle des 6 mois, les exceptions, et les cas particuliers
              (électrique, collection, importé).
            </p>
            <span className="tag">Voir les obligations →</span>
          </a>

          <a className="card" href="/guide">
            <span className="icon">📊</span>
            <h3>Guide &amp; chiffres officiels</h3>
            <p>
              Prix réels, motifs de contre-visite, FAQ, différences
              voiture/moto — avec sources vérifiées.
            </p>
            <span className="tag">Consulter le guide →</span>
          </a>

          <a className="card" href="/actualites">
            <span className="icon">📰</span>
            <h3>Actualités</h3>
            <p>
              Les évolutions réglementaires du contrôle technique, sourcées
              et vérifiées.
            </p>
            <span className="tag">Voir les actualités →</span>
          </a>
        </div>

        <div className="cta-ct">
          <div className="texte">
            <p className="title">Prêt à passer votre contrôle technique ?</p>
            <p className="sub">Trouvez un créneau disponible près de chez vous via Créneau CT.</p>
          </div>
          <a className="btn" href="https://creneauct.fr?utm_source=avant-mon-ct&utm_medium=website&utm_campaign=home" target="_blank" rel="noopener noreferrer">
            Prendre RDV sur Créneau CT
          </a>
        </div>
      </div>
    </>
  );
}
