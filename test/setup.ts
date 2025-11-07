import { pool } from '../src/config/config';

// After all tests, we'll close the database connection pool
afterAll(async () => {
  await pool.end();
});
