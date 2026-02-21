import { Pool, type PoolConfig } from "pg";
import { env, getDbConfigParts } from "../config/env";

const config: PoolConfig = env.databaseUrl
  ? { connectionString: env.databaseUrl }
  : getDbConfigParts();

if (env.db.ssl) {
  config.ssl = { rejectUnauthorized: env.db.sslRejectUnauthorized };
}

export const db = new Pool(config);

export async function checkDbConnection(): Promise<void> {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database not connected", err);
    throw err;
  }
}

export async function closeDb(): Promise<void> {
  await db.end();
}

