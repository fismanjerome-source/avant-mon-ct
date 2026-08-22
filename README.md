# Avant Mon CT

Service gratuit et indépendant pour préparer son contrôle technique, voiture
et moto : checklist, rappel d'échéance, rappels constructeur, recherche de
centres agréés, guide et actualités. Pas d'objectif commercial — juste un
service utile, avec un lien optionnel vers Créneau CT pour ceux qui veulent
réserver un créneau.

## Design "moins IA générique"
J'ai lancé Créneau CT en local pour repérer ce qui le rend naturel plutôt
que "site généré" et repris les mêmes réflexes ici :
- **Logo dessiné** (`app/components/Logo.js`) — même cadran à 12 repères que
  Créneau CT, avec une coche de vérification à la place du monogramme "CT"
  (favicon et image Open Graph assortis)
- **Nav conversationnelle** : "Un rappel connu ?", "Quoi de neuf ?",
  "Bien l'entretenir" plutôt que des intitulés génériques ("Rappels",
  "Actus", "Entretien")
- **Eyebrow** avec emoji + phrase courte, plus de badge tout-caps en police
  mono façon certification officielle
- **Cartes** avec emoji plutôt qu'une icône uniforme dans un carré pâle
  (le tell le plus reconnaissable d'un site généré par IA)
- **Hero aligné à gauche**, sans fond dégradé décoratif ; **CTA en bloc
  plat** (fini le glow radial en coin) ; **chiffres en ligne simple**
  plutôt qu'en grille de cases avec police mono partout
- **Bloc de contact humain réel** (téléphone/SMS/WhatsApp/email de Créneau
  CT, copié depuis leur code — même équipe, mêmes coordonnées)
- **Tampon** (`.stamp`, cercle pointillé doré incliné à -6°) — même
  signature visuelle que les cartes centre de Créneau CT, dispo pour un
  futur badge "vérifié"

## Lien avec Créneau CT
Avant Mon CT est présenté comme édité par la même entité que Créneau CT
(mentions légales, CGU, confidentialité alignées, même email
contact@creneauct.fr, même hébergeur Render + Turso). Le SIRET, le nom de
l'éditeur et l'adresse restent `data-todo` des deux côtés — Créneau CT ne
les a pas non plus finalisés (vérifié directement dans son code).

## SEO
Métadonnées (title/description/canonical) sur les 13 pages indexables.
Données structurées JSON-LD : `WebSite` (toutes les pages), `FAQPage`
(`/guide`, `/vente-occasion`), `ItemList` (`/points-controle`,
`/entretien`). `robots.txt` et `sitemap.xml` générés automatiquement,
tenus à jour à chaque nouvelle page. Image Open Graph dynamique, favicon.
Les pages `/mentions-legales`, `/cgu` et `/confidentialite` sont
volontairement en `noindex` (pas d'intérêt pour la recherche) et absentes
du sitemap.

## Accessibilité et responsive
- Contraste vérifié (calcul WCAG) et corrigé sur deux points : le texte
  "eyebrow" (or sur blanc, 2,22:1 → passé en navy, largement conforme) et
  les notes de source (gris clair, 3,03:1 → assombri à ~5:1)
- Lien d'évitement ("Aller au contenu") pour la navigation clavier
- Testé sans débordement horizontal sur 9 pages à 375px (largeur iPhone
  SE, la plus étroite courante) : accueil, checklist, rappels (avec
  résultats), centres (avec résultats), points de contrôle, guide,
  entretien, vente d'occasion
- `.env.example` ajouté (variables Turso pour le déploiement)

## Design
Palette et typographie reprises de Créneau CT pour une cohérence de marque :
navy officiel (#1B3A5C) + accent or (#D9A62E), Space Grotesk pour les titres,
Inter pour le texte, Space Mono pour les chiffres/données. Mode sombre inclus
(`prefers-color-scheme`). Animations d'entrée (fade/slide) sur chaque page et
sur les cartes, via `app/template.js` — respecte `prefers-reduced-motion`.

## Photos
5 photos libres de droits (licence Unsplash — gratuite, usage commercial
autorisé, aucune attribution légalement requise, créditée quand même par
courtoisie) dans `public/images/`. Intégrées via `next/image` pour
l'optimisation automatique (redimensionnement, lazy loading). Crédits :
Kate Ibragimova, Chad Kirchoff, C Joyful, CHUTTERSNAP, Mehmet Talha Onuk.

## Ce qui est fait
- Page d'accueil avec chiffres clés (UTAC-OTC, DGCCRF) et 8 outils
- **Les 136 points de contrôle** (`/points-controle`) : accordéon par fonction
  officielle (9 fonctions), toggle voiture (136 points) / moto (~80 points).
  Volontairement pas de comptage précis par fonction : cette donnée n'est pas
  publiée par l'organisme officiel, je ne l'ai pas inventée.
- **Guide d'entretien** (`/entretien`) : quotidien, révisions, conduite,
  hiver (Loi Montagne 2), été
- **Vente d'occasion** (`/vente-occasion`) : obligation du CT de moins de 6
  mois (article R323-22 du Code de la route), délai de 2 mois si
  contre-visite, cas particuliers (électrique, collection, importé). J'ai
  vérifié une rumeur de "CT annuel dès 10 ans en 2026" : c'est faux, c'est
  une proposition européenne que la France rejette officiellement — je le
  précise sur la page plutôt que de laisser courir l'info.
- **Carte de France interactive avec les vrais tracés départementaux**
  (`lib/departementsFrance.js`) — générée à partir du GeoJSON ouvert
  gregoiredavid/france-geojson (96 départements, projection + simplification
  calculées, pas de tracé approximatif). Remplace une première version
  stylisée en hexagone jugée "horrible" — corrigée avec de vraies données
  géographiques. Au survol : nom + code pour les 96, chiffre réel affiché
  uniquement pour les 3 départements vérifiés, "donnée non disponible" pour
  les 93 autres plutôt qu'un chiffre inventé.
- **Pages de confiance** : `/a-propos` (transparence sur les sources et le
  lien avec Créneau CT), `/mentions-legales`, `/cgu`, `/confidentialite`
  (RGPD — quelles données sont collectées via le formulaire de rappel,
  pourquoi, combien de temps)
- **Page 404** personnalisée, **favicon** (rond navy → carré arrondi plein,
  plus lisible en petit sur un onglet de bureau) et **image de partage**
  (Open Graph, générée dynamiquement) aux couleurs du site
- Barre de recherche unifiée dans l'en-tête (villes → centres, marques →
  rappels), comme sur Houblon chez toi
- Checklist interactive **voiture ou moto** (points différents : chaîne,
  fourche, garde-boue pour les motos), avec barre de progression
- **Rappels constructeur en direct** (`/rappels`) : interroge l'API officielle
- Barre de recherche unifiée dans l'en-tête (villes → centres, marques →
  rappels), comme sur Houblon chez toi
- Checklist interactive **voiture ou moto** (points différents : chaîne,
  fourche, garde-boue pour les motos), avec barre de progression
- **Rappels constructeur en direct** (`/rappels`) : interroge l'API officielle
  RappelConso (DGCCRF, data.economie.gouv.fr) par marque, avec filtre optionnel
  par modèle (texte libre), mise à jour toutes les heures
- **Recherche de centres agréés en direct** (`/centres`) : interroge l'annuaire
  officiel DGCCRF (6 100+ centres), par code postal/département, voiture ou
  moto
- Guide avec **prix moyens réels calculés en direct** (agrégation live sur le
  jeu de données "Prix des contrôles techniques", pas une estimation), tableau
  des motifs de contre-visite, FAQ avec données structurées JSON-LD, section
  voiture vs moto
- Page **Actualités** : sélection vérifiée manuellement des évolutions
  réglementaires, avec liens sourcés (voir note sur Légifrance ci-dessous)
- Formulaire de rappel d'échéance (enregistré en base SQLite locale via
  `@libsql/client`, l'envoi d'email n'est pas encore branché)
- SEO : métadonnées par page, Open Graph, données structurées JSON-LD
  (WebSite + FAQPage), `robots.txt` et `sitemap.xml` générés automatiquement

## Sources de données ouvertes utilisées
- **UTAC-OTC** (bilan annuel, statique) — nombre de contrôles, taux de
  contre-visite
- **RappelConso V2** (DGCCRF, live) — `data.economie.gouv.fr`, dataset
  `rappelconso-v2-gtin-espaces`
- **Annuaire des centres de contrôle technique** (DGCCRF, live) —
  `data.economie.gouv.fr`, dataset `annuaire-centres-controle-technique`
- **Prix des contrôles techniques** (DGCCRF, live) — `data.economie.gouv.fr`,
  dataset `prix-controle-technique`
- **Base Adresse Nationale** (live) — `api-adresse.data.gouv.fr`, pour la
  recherche de villes dans la barre de recherche

## Une limite volontaire, pour rester honnête
On m'a demandé d'ajouter les "spécificités par marque et modèle" (défauts
fréquents connus par modèle). Je ne l'ai pas fait : il n'existe pas de
donnée officielle fiable à cette granularité, et publier des affirmations
techniques non vérifiées aurait été trompeur. À la place, la recherche par
marque interroge RappelConso, qui est une donnée 100% officielle et vérifiable
(rappels constructeur réels).

## Pourquoi pas de flux Légifrance en direct ?
Légifrance propose une API officielle (PISTE), mais elle nécessite une
inscription et des identifiants OAuth2 (client_id/secret) propres à un
compte — impossible à connecter sans que vous créiez un compte gratuit sur
piste.gouv.fr et transmettiez les identifiants. La page `/actualites` reste
donc une sélection vérifiée manuellement en attendant.

## Ce qu'il reste à faire
- Envoi effectif des emails de rappel (ex. via Resend, qui a un plan gratuit)
  + une tâche planifiée qui vérifie chaque jour les échéances à venir
  (volontairement pas fait pour l'instant, à la demande de l'utilisateur)
- ~~Remplacer le lien "Prendre RDV sur Créneau CT" par la vraie URL~~ fait
  → https://creneauct.fr partout (en-tête + 9 pages), ouverture dans un
  nouvel onglet
- **Compléter les mentions légales et la politique de confidentialité**
  (`data-todo` : nom de l'éditeur, adresse, SIRET, email de contact,
  hébergeur) avant toute mise en ligne réelle
- **Lancement du site conditionné à avoir assez de centres partenaires sur
  Créneau CT** (décision prise avec l'utilisateur)
- Acheter un nom de domaine et le remplacer dans `app/layout.js`,
  `app/robots.js` et `app/sitemap.js` (actuellement `avant-mon-ct.fr` en
  placeholder)
- Éventuellement : connecter l'API Légifrance PISTE si vous créez un compte
- Déploiement (Render + Turso, comme Créneau CT — corrigé après vérification,
  Créneau CT n'est pas sur Vercel contrairement à ce que j'avais supposé)
- Une fois en ligne : soumettre le site à la Search Console Google, demander
  quelques liens depuis des sites pertinents (mairie, centres partenaires) —
  le contenu et les données structurées sont prêts, mais le référencement
  prend du temps face à des sites installés depuis des années

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000 (ou le port indiqué si 3000 est déjà pris par
un autre projet).
