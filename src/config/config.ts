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

/**
 * A simple function to initialize the database schema.
 * This creates the 'users' table if it doesn't already exist.
 */
export const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log('Database schema initialized successfully.');
  } catch (err) {
    console.error('Error initializing database schema:', err);
    // Exit the process if we can't connect/init the DB
    process.exit(1);
  }
};

// other env vars
export const PORT = process.env.PORT || 3000;
