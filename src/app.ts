import express, { Express, Router } from 'express';
import { initDb, pool } from './config/config';
import { PostgresUserRepository } from './client/userRepo/postgres/userRepo';
import { InMemoryNotificationClient } from './client/notification/memory/notification';
import { UserService } from './service/user/service';
import { UserHandler } from './api/user/handler';

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
