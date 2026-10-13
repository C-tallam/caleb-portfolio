import mongoose from 'mongoose';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error('Could not connect to MongoDB Atlas:', err.message);
    process.exit(1);
  }
  const server = app.listen(env.port, () => console.log(`API listening on port ${env.port}`));
  const shutdown = () => server.close(() => mongoose.connection.close().then(() => process.exit(0)));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
start();
