import { createClient } from "@libsql/client";

let client;

export function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL || "file:local.db",
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function ensureSchema() {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS rappels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plaque TEXT NOT NULL,
      email TEXT NOT NULL,
      date_echeance TEXT NOT NULL,
      cree_le TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}
