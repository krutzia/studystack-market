import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set. API routes requiring DB will fail in non-configured environments.');
}

let cached = globalThis._mongoose;

export async function connect() {
  if (cached && cached.connection && cached.connection.readyState) {
    return cached;
  }

  if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

  const conn = await mongoose.connect(MONGODB_URI, {
    // options are ok defaults for mongoose v7
  });

  cached = conn;
  globalThis._mongoose = cached;
  return cached;
}
