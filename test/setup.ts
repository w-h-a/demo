import { pool } from '../src/config/config';

// Before all tests, we'll clear the users table to ensure a clean state
beforeAll(async () => {
  try {
    await pool.query('DELETE FROM users');
  } catch (err) {
    console.error('Error cleaning database:', err);
  }
});

// After all tests, we'll close the database connection pool
afterAll(async () => {
  await pool.end();
});
