import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
};

function getMongoURI(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Please check environment variables."
    );
  }

  const cleanURI = uri.trim();

  if (
    !cleanURI.startsWith("mongodb://") &&
    !cleanURI.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      'Invalid MongoDB URI. URI must start with "mongodb://" or "mongodb+srv://".'
    );
  }

  return cleanURI;
}

async function connectDB(): Promise<typeof mongoose> {
  if (
    cached.conn &&
    mongoose.connection.readyState === 1
  ) {
    return cached.conn;
  }

  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      cached.conn = null;
      throw error;
    }
  }

  const uri = getMongoURI();

  cached.promise = mongoose
    .connect(uri, {
      maxPoolSize: 20,
      minPoolSize: 1,
      maxConnecting: 5,

      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      waitQueueTimeoutMS: 30000,

      retryWrites: true,
      retryReads: true,

      autoIndex:
        process.env.NODE_ENV !== "production",
    })
    .then((mongooseInstance) => {
      console.log("=================================");
      console.log("MongoDB Connected Successfully");
      console.log(
        `Host: ${mongooseInstance.connection.host}`
      );
      console.log(
        `Database: ${mongooseInstance.connection.name}`
      );
      console.log("=================================");

      return mongooseInstance;
    })
    .catch((error) => {
      cached.promise = null;
      cached.conn = null;

      console.error(
        "MongoDB Connection Error:",
        error instanceof Error
          ? error.message
          : error
      );

      throw error;
    });

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export async function ensureDBConnection() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  return connectDB();
}

export function getMongoStatus() {
  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
    99: "uninitialized",
  };

  const readyState =
    mongoose.connection.readyState;

  return {
    readyState,
    status: states[readyState] ?? "unknown",
    host: mongoose.connection.host || null,
    database: mongoose.connection.name || null,
  };
}

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export default connectDB;