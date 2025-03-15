import { environments } from "@/utils/environment";
import mongoose from "mongoose";

const MONGODB_URI = environments.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Chưa cấu hình MONGODB_URI trong .env");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "egamen_db",
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
