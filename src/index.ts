import { createServer } from './app';
import { PORT } from './config/config';

const startServer = async () => {
  try {
    const srv = await createServer();
    srv.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err: unknown) {
    console.error('Failed to start server: ', err);
    process.exit(1);
  }
};

// TODO: add graceful shutdown

startServer();
