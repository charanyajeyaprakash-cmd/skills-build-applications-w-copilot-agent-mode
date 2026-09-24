import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
  return mongoose;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

export const database = mongoose.connection;
