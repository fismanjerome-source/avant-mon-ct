import { getDb, ensureSchema } from "../../../lib/db";
import { verifierLimite, enregistrerEchec, obtenirIp } from "../../../lib/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const ip = obtenirIp(request);
  const cle = `rappel:${ip}`;
  const limite = verifierLimite(cle);
  if (!limite.autorise) {
    return Response.json(
      { error: `Trop de demandes depuis cette adresse. Réessayez dans ${limite.minutesRestantes} minute(s).` },
      { status: 429 }
    );
  }
  enregistrerEchec(cle);

  const body = await request.json().catch(() => ({}));
  const { plaque, email, dateEcheance } = body;

  if (!plaque || !email || !dateEcheance) {
    return Response.json(
      { error: "Plaque, email et date d'échéance sont requis." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: "INSERT INTO rappels (plaque, email, date_echeance) VALUES (?, ?, ?)",
    args: [plaque.toUpperCase().trim(), email.trim(), dateEcheance],
  });

  return Response.json({ ok: true });
}
