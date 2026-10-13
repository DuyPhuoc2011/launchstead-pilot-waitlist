import { defineConfig } from "prisma/config";

// `prisma generate` runs at build time without a database, so the URL may be
// empty then; `prisma migrate deploy` gets DATABASE_URL from Secret Manager.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
