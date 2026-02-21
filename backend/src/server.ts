import { app } from "./app.ts";
import { env } from "./config/env.ts";
import { checkDbConnection } from "./db/database.ts";
import { ensureFleetflowSchema } from "./db/fleetflowSchema.ts";

try {
  await checkDbConnection();
  await ensureFleetflowSchema();
} catch (err) {
  console.error("❌ startup failed", err);
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`Server is running at http://localhost:${env.port}`);
});
