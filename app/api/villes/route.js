export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return Response.json({ villes: [] });
  }

  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    q
  )}&type=municipality&limit=6`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ villes: [] });
  }
  const data = await res.json();

  const villes = (data.features || []).map((f) => ({
    nom: f.properties.city,
    codePostal: f.properties.postcode,
  }));

  return Response.json({ villes });
}
