import { NextResponse } from 'next/server';

// Reporte chaque page vue à Créneau CT, pour que les statistiques d'Avant
// Mon CT apparaissent dans le même tableau de bord (espace admin de
// Créneau CT), au lieu de dupliquer un espace admin ici. TRACER_SECRET
// doit être exactement la même valeur que côté Créneau CT — sans elle
// (ex: en local sans .env configuré), l'appel est simplement rejeté côté
// serveur, donc jamais bloquant pour la navigation.
export function middleware(request) {
  if (!process.env.TRACER_SECRET) return NextResponse.next();

  const { pathname } = request.nextUrl;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || null;

  fetch('https://creneauct.fr/api/interne/tracer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chemin: pathname, categorie: 'avantmonct', ip, cle: process.env.TRACER_SECRET }),
  }).catch(() => {});

  return NextResponse.next();
}

export const config = {
  // Ne s'applique qu'aux vraies pages, jamais aux fichiers statiques, à
  // l'API elle-même, ou aux images/favicon.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|opengraph-image|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)',
  ],
};
