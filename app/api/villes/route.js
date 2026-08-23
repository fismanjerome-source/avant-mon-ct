export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return Response.json({ villes: [] });
  }

  // geo.api.gouv.fr (officiel, INSEE) plutôt que la recherche d'adresses BAN :
  // avec boost=population, "rou" remonte bien Rouen et Roubaix en tête, alors
  // que la BAN classait des hameaux de moins de 300 habitants avant Rouen.
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
    q
  )}&boost=population&fields=nom,codesPostaux,centre&limit=6`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ villes: [] });
  }
  const data = await res.json();

  const villes = (Array.isArray(data) ? data : []).map((commune) => ({
    nom: commune.nom,
    codePostal: commune.codesPostaux?.[0] || "",
    // [longitude, latitude] du centre de la commune, pour trier les centres
    // de contrôle technique par distance réelle plutôt que par département.
    lon: commune.centre?.coordinates?.[0] ?? null,
    lat: commune.centre?.coordinates?.[1] ?? null,
  }));

  return Response.json({ villes });
}
