import app from './src/app.js';
import env from './src/config/env.js';
import { connectDb } from './src/config/db.js';
import { ensureAdminFromEnv } from './src/utils/ensureAdmin.js';

/**
 * Entry point. The API starts even if MongoDB is unreachable so the process stays observable
 * (GET /api/health); database-backed routes answer 503 until it connects.
 */
async function main() {
  await connectDb();
  await ensureAdminFromEnv();
  app.listen(env.port, () => {
    console.log(`[server] Manjil Publication API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });
}

main();
