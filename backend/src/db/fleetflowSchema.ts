import { db } from "./database";

type SchemaStep = {
  filename: string;
  table?: string;
};

const STEPS: readonly SchemaStep[] = [
  { filename: "00_extensions.sql" },
  { filename: "00_user_role.sql" },
  { filename: "01_users.sql", table: "users" },
  { filename: "02_vehicles.sql", table: "vehicles" },
  { filename: "03_drivers.sql", table: "drivers" },
  { filename: "04_driver_complaints.sql", table: "driver_complaints" },
  { filename: "05_trips.sql", table: "trips" },
  { filename: "06_service_logs.sql", table: "service_logs" },
  { filename: "07_trip_expenses.sql", table: "trip_expenses" },
  { filename: "08_functions.sql" },
  { filename: "09_triggers.sql" },
  { filename: "10_views.sql" },
] as const;

async function tableExists(table: string): Promise<boolean> {
  const qualified = `public.${table}`;
  const res = await db.query<{ exists: boolean }>(
    "SELECT to_regclass($1) IS NOT NULL AS exists",
    [qualified],
  );
  return res.rows[0]?.exists ?? false;
}

export async function ensureFleetflowSchema(): Promise<void> {
  try {
    for (const step of STEPS) {
      const existedBefore = step.table
        ? await tableExists(step.table)
        : undefined;

      const url = new URL(`../../sql/${step.filename}`, import.meta.url);
      const sql = await Bun.file(url).text();
      try {
        await db.query(sql);
      } catch (err) {
        console.error(`❌ Schema step failed: ${step.filename}`, err);
        throw err;
      }

      if (step.table) {
        const existsAfter = await tableExists(step.table);
        if (!existsAfter) {
          throw new Error(`Table not found after schema step: ${step.table}`);
        }

        if (existedBefore) {
          console.log(`ℹ️ table already exists: ${step.table}`);
        } else {
          console.log(`✅ table created: ${step.table}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ FleetFlow schema init failed", err);
    throw err;
  }
}
