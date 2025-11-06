import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { Express } from 'express';
import { createServer } from '../src/app';
import { pool } from '../src/config/config';

/**
 * Integration tests entire use cases or slices
 * through the server from the HTTP request down to the
 * database and back.
 */
describe('Users', () => {
  let srv: Express;
  let agent: TestAgent;

  beforeAll(async () => {
    srv = await createServer();
    agent = supertest(srv);
  });

  afterEach(async () => {
    await pool.query('DELETE FROM users;');
  });

  describe('POST /api/users', () => {
    it('should create a new user and return 201', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      // Act
      const rsp = await agent.post('/api/users').send(userData);

      // Assert
      expect(rsp.status).toBe(201);
      expect(rsp.body.name).toBe(userData.name);
      expect(rsp.body.email).toBe(userData.email);
      expect(rsp.body.id).toBeDefined();

      const dbResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [userData.email]
      );
      expect(dbResult.rowCount).toBe(1);
      expect(dbResult.rows[0].name).toBe(userData.name);
    });
  });
});
