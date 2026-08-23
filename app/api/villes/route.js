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
  )}&boost=population&fields=nom,codesPostaux&limit=6`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ villes: [] });
  }
  const data = await res.json();

  const villes = (Array.isArray(data) ? data : []).map((commune) => ({
    nom: commune.nom,
    codePostal: commune.codesPostaux?.[0] || "",
  }));

  return Response.json({ villes });
}
