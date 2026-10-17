import mongoose from 'mongoose';
import env from './env.js';

mongoose.set('strictQuery', true);

/** True when Mongoose has an open connection (readyState 1). */
export const isDbReady = () => mongoose.connection.readyState === 1;

export async function connectDb() {
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 4000 });
    console.log('[db] Connected to MongoDB');
  } catch (err) {
    console.warn(`[db] Could not connect to MongoDB (${err.message}). DB-backed routes will return 503 until it is available.`);
    // Mongoose will not retry the initial connection on its own, so retry in the background.
    setTimeout(connectDb, 10000).unref();
  }
}
