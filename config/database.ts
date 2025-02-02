import env from "#start/env";
import { defineConfig } from "@adonisjs/lucid";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const dbConfig = defineConfig({
  connection: "postgres",
  connections: {
    postgres: {
      client: "pg",
      connection: {
        host: env.get("DB_HOST"),
        port: env.get("DB_PORT"),
        user: env.get("DB_USER"),
        password: env.get("DB_PASSWORD"),
        database: env.get("DB_DATABASE"),
        ...(env.get('NODE_ENV') === 'production' && {
          ssl: {
            ca: fs.readFileSync(path.dirname(fileURLToPath(import.meta.url)) + '../../ca.pem')
          },
        }),
      },
      migrations: {
        naturalSort: true,
        paths: ["database/migrations"],
      },
    },
  },
});

export default dbConfig;
