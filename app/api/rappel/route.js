import { getDb, ensureSchema } from "../../../lib/db";

export async function POST(request) {
  const body = await request.json();
  const { plaque, email, dateEcheance } = body;

  if (!plaque || !email || !dateEcheance) {
    return Response.json(
      { error: "Plaque, email et date d'échéance sont requis." },
      { status: 400 }
    );
  }

  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: "INSERT INTO rappels (plaque, email, date_echeance) VALUES (?, ?, ?)",
    args: [plaque.toUpperCase().trim(), email.trim(), dateEcheance],
  });

  return Response.json({ ok: true });
}
