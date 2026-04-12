import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const db = drizzle(databaseUrl, {
  casing: "snake_case",
});
