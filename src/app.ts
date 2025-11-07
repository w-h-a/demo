import express, { Express, Router } from 'express';
import { pool } from './config/config';
import { PostgresUserRepository } from './client/userRepo/postgres/userRepo';
import { InMemoryNotificationClient } from './client/notification/memory/notification';
import { UserService } from './service/user/service';
import { UserHandler } from './handler/user/handler';

/**
 * A simple function to initialize the database schema.
 * This creates the 'users' table if it doesn't already exist.
 */
const initDb = async () => {
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

/**
 * Creates the router
 */
const createRouter = (userHandler: UserHandler): Router => {
  const router = Router();

  router.post('/users', userHandler.createUser);
  router.get('/users/:id', userHandler.getUserById);
  router.get('/users', userHandler.getAllUsers);

  // TODO: add other user routes and non-user routes

  return router;
};

/**
 * Create the server
 */
export const createServer = async (): Promise<Express> => {
  // 1. initialize tracing

  // 2. initialize db
  await initDb();

  // 3. create clients
  const userRepo = new PostgresUserRepository(pool);
  const notificationClient = new InMemoryNotificationClient();

  // 4. create services
  const userService = new UserService(userRepo, notificationClient);

  // 5. create handlers
  const userHandler = new UserHandler(userService);

  // 6. create router
  const router = createRouter(userHandler);

  // 7. create app
  const app = express();

  app.use(express.json());
  app.use('/api', router);

  return app;
};
