export const FONCTIONS_VOITURE = [
  {
    id: "identification",
    nom: "Identification du véhicule",
    points: [
      "Plaque d'immatriculation : présence, lisibilité, format",
      "Numéro de série (VIN) frappé sur le châssis, concordance avec la carte grise",
      "Plaque constructeur",
    ],
  },
  {
    id: "freinage",
    nom: "Équipements de freinage",
    points: [
      "Frein de service (efficacité mesurée au banc, équilibrage gauche/droite)",
      "Frein de stationnement (frein à main)",
      "État des disques, plaquettes, durites et liquide de frein",
      "Système antiblocage (ABS) s'il est présent",
    ],
  },
  {
    id: "direction",
    nom: "Direction",
    points: [
      "Jeu du volant et de la colonne de direction",
      "État de la crémaillère et des rotules",
      "Angles et parallélisme (ripage) des roues avant",
      "Direction assistée : absence de fuite",
    ],
  },
  {
    id: "visibilite",
    nom: "Visibilité",
    points: [
      "Pare-brise : absence de fissure de plus de 30 cm ou dans le champ de vision",
      "Essuie-glaces et lave-glace avant fonctionnels",
      "Rétroviseurs présents et en bon état",
      "Vitres latérales et arrière",
    ],
  },
  {
    id: "eclairage",
    nom: "Feux, dispositifs réfléchissants et équipements électriques",
    points: [
      "Feux de croisement, de route, de position, antibrouillard",
      "Clignotants, feux stop, feux de recul, feu de plaque",
      "Catadioptres et état du faisceau lumineux",
      "Batterie et câblage électrique visible",
    ],
  },
  {
    id: "essieux",
    nom: "Essieux, roues, pneus, suspension",
    points: [
      "Profondeur des sculptures des pneus (minimum légal 1,6 mm)",
      "État général des pneus : hernies, déchirures, dimensions conformes",
      "Amortisseurs, ressorts, silentblocs",
      "Jantes et roulements de roue",
    ],
  },
  {
    id: "chassis",
    nom: "Châssis et accessoires du châssis",
    points: [
      "État du châssis : corrosion, déformation, fissures",
      "Fixation du pot d'échappement",
      "Réservoir de carburant : étanchéité, fixation",
      "Carrosserie : éléments coupants ou saillants",
    ],
  },
  {
    id: "autre-materiel",
    nom: "Autre matériel",
    points: [
      "Ceintures de sécurité et sièges (fixation, état)",
      "Avertisseur sonore (klaxon)",
      "Compteur de vitesse",
      "Dispositif d'attelage si présent",
    ],
  },
  {
    id: "nuisances",
    nom: "Nuisances (pollution et bruit)",
    points: [
      "Opacité des fumées (diesel) ou teneur en CO (essence)",
      "Absence de fuite d'huile ou de liquide de refroidissement",
      "Niveau sonore de l'échappement",
      "Voyant moteur / OBD (diagnostic embarqué)",
    ],
  },
];

export const FONCTIONS_MOTO = [
  {
    id: "identification",
    nom: "Identification du véhicule",
    points: [
      "Plaque d'immatriculation : lisibilité, fixation, conformité",
      "Numéro de série du cadre, concordance avec la carte grise",
    ],
  },
  {
    id: "freinage",
    nom: "Équipements de freinage",
    points: [
      "État des plaquettes et disques",
      "Durites hydrauliques et liquide de frein",
      "Efficacité mesurée au banc",
      "ABS s'il est présent",
    ],
  },
  {
    id: "direction",
    nom: "Direction",
    points: [
      "Jeu dans les roulements de colonne de direction",
      "État de la fourche : étanchéité, absence de fuite",
      "Débattement du guidon et fonctionnement des commandes",
    ],
  },
  {
    id: "visibilite",
    nom: "Visibilité",
    points: [
      "Présence et état des rétroviseurs",
      "Surface réfléchissante sans cassure",
    ],
  },
  {
    id: "eclairage",
    nom: "Feux et équipement électrique",
    points: [
      "Feux de croisement, route, position, stop",
      "Clignotants avant et arrière, éclairage de plaque",
      "Orientation et conformité des phares",
    ],
  },
  {
    id: "essieux",
    nom: "Essieux, roues, pneus, suspension",
    points: [
      "Profondeur des sculptures (minimum légal 1 mm)",
      "Dimensions des pneus conformes à la carte grise",
      "État des jantes, roulements, amortisseurs",
    ],
  },
  {
    id: "chassis",
    nom: "Châssis et accessoires",
    points: [
      "Intégrité du cadre (absence de fissure)",
      "Fixation du moteur et du réservoir",
      "État du système d'échappement",
      "Fonctionnement des béquilles",
    ],
  },
  {
    id: "nuisances",
    nom: "Nuisances (bruit et émissions)",
    points: [
      "Niveau sonore au sonomètre",
      "Conformité du pot d'échappement (non débridé)",
      "Opacité des fumées",
      "Vitesse réelle au céléromètre pour les cyclomoteurs 50cc (depuis mars 2026)",
    ],
  },
  {
    id: "autres",
    nom: "Autres équipements",
    points: [
      "Avertisseur sonore (klaxon)",
      "Compteur de vitesse et odomètre",
      "Béquille de sécurité et contacteur",
      "Antivol / verrou de direction",
    ],
  },
];
