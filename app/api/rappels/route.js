const DATASET_URL =
  "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-espaces/records";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const marque = searchParams.get("marque");
  const modele = searchParams.get("modele");

  if (!marque) {
    return Response.json({ error: "Paramètre 'marque' requis." }, { status: 400 });
  }

  let where = `categorie_produit="automobiles et moyens de déplacement" and marque_produit like "${marque.replace(/"/g, "")}"`;
  if (modele && modele.trim()) {
    where += ` and modeles_ou_references like "${modele.trim().replace(/"/g, "")}"`;
  }
  const url = `${DATASET_URL}?where=${encodeURIComponent(where)}&limit=20&order_by=date_publication desc`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ error: "Service RappelConso indisponible." }, { status: 502 });
  }
  const data = await res.json();

  const rappels = (data.results || []).map((r) => ({
    date: r.date_publication,
    marque: r.marque_produit,
    modeles: r.modeles_ou_references,
    motif: r.motif_rappel,
    risque: r.risques_encourus,
    conduite: r.conduites_a_tenir_par_le_consommateur,
    compensation: r.modalites_de_compensation,
    contact: r.numero_contact,
    lien: r.lien_vers_la_fiche_rappel,
  }));

  return Response.json({ total: data.total_count, rappels });
}
