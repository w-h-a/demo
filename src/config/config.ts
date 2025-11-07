import 'dotenv/config';
import { Pool } from 'pg';

/**
 * Create the connection pool.
 * We read the connection details from environment variables.
 */
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// other env vars
export const PORT = process.env.PORT || 3000;
