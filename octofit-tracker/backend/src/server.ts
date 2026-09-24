import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase, database } from './config/database';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  const databaseConnected = database.readyState === 1;
  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'degraded',
    database: databaseConnected ? 'connected' : 'disconnected',
  });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Octofit API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start API because MongoDB is unavailable:', error);
    process.exit(1);
  }
}

startServer();