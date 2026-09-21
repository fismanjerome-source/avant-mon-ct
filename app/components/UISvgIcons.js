// Jeu d'icônes à trait fin, même style que Créneau CT : remplace les emoji,
// dont le rendu varie selon la plateforme et fait peu sérieux.

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export function IconCoche({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.5 2.4 2.4 4.6-5.3" />
    </svg>
  );
}
export function IconListe({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="5" y="4" width="14" height="17" rx="2" /><rect x="9" y="2.5" width="6" height="3" rx="1" />
      <line x1="8.5" y1="10.5" x2="15.5" y2="10.5" /><line x1="8.5" y1="14" x2="15.5" y2="14" /><line x1="8.5" y1="17.5" x2="12.5" y2="17.5" />
    </svg>
  );
}
export function IconCle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M14.5 6.5a4 4 0 0 0 5 5L11 20a2.1 2.1 0 0 1-3-3l8.500-8.500" /><path d="M14.5 6.5 17 4l3 3-2.500 2.500" />
    </svg>
  );
}
export function IconAlerte({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 4 2.8 19.5h18.4L12 4Z" /><line x1="12" y1="10" x2="12" y2="14.5" /><circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}
export function IconPin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" /><circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}
export function IconHorloge({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />
    </svg>
  );
}
export function IconPersonnes({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="8.5" cy="7.5" r="3.2" /><path d="M2.5 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="8.5" r="2.6" /><path d="M15.3 14.3c2.6.4 4.2 2.4 4.2 5.7" />
    </svg>
  );
}
export function IconGraphique({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <line x1="4" y1="20" x2="20" y2="20" /><rect x="5.5" y="13" width="3.2" height="7" />
      <rect x="10.4" y="8" width="3.2" height="12" /><rect x="15.3" y="4" width="3.2" height="16" />
    </svg>
  );
}
export function IconJournal({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="12.5" x2="16" y2="12.5" /><line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}
export function IconInfo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" /><line x1="12" y1="11" x2="12" y2="16.5" /><circle cx="12" cy="7.9" r="0.6" fill="currentColor" />
    </svg>
  );
}
export function IconBalance({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <line x1="12" y1="3" x2="12" y2="21" /><line x1="6" y1="21" x2="18" y2="21" /><line x1="4" y1="7" x2="20" y2="7" />
      <path d="M4 7 1.5 12.5a2.7 2.7 0 0 0 5 0Z" /><path d="M20 7 17.5 12.5a2.7 2.7 0 0 0 5 0Z" /><circle cx="12" cy="4.5" r="1.4" />
    </svg>
  );
}
export function IconRecu({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6 3h12v18l-2.5-1.6L13 21l-2.5-1.6L8 21l-2-18Z" /><line x1="8.5" y1="8" x2="15.5" y2="8" /><line x1="8.5" y1="12" x2="15.5" y2="12" />
    </svg>
  );
}
export function IconCadenas({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
  );
}
export function IconCalendrier({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" /><line x1="3" y1="9.5" x2="21" y2="9.5" />
      <line x1="8" y1="2.5" x2="8" y2="6.5" /><line x1="16" y1="2.5" x2="16" y2="6.5" />
    </svg>
  );
}
export function IconVoiture({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 16V11l2-5h12l2 5v5" /><rect x="2.5" y="16" width="19" height="4" rx="1.3" />
      <circle cx="7" cy="18" r="1.1" fill="currentColor" stroke="none" /><circle cx="17" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconGlobe({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.500 2.500 3.500 5.300 3.500 8.500s-1 6-3.500 8.500c-2.500-2.500-3.500-5.300-3.500-8.500s1-6 3.500-8.500Z" />
    </svg>
  );
}
