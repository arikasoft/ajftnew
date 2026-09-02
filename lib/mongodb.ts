import mongoose from "mongoose";

/* =========================================================
   TYPES
========================================================= */

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/* =========================================================
   GLOBAL CACHE
========================================================= */

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache =
  globalCache.mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!globalCache.mongooseCache) {
  globalCache.mongooseCache = cached;
}

/* =========================================================
   GET MONGODB URI
========================================================= */

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

/* =========================================================
   CONNECT DATABASE
========================================================= */

async function connectDB(): Promise<typeof mongoose> {
  /*
   * Already connected.
   */

  if (
    cached.conn &&
    mongoose.connection.readyState === 1
  ) {
    return cached.conn;
  }

  /*
   * Connection is already in progress.
   */

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

  /*
   * Get MongoDB URI.
   */

  const uri = getMongoURI();

  /*
   * Create MongoDB connection.
   */

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

/* =========================================================
   ENSURE DATABASE CONNECTION
========================================================= */

export async function ensureDBConnection() {
  /*
   * Already connected.
   */

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  /*
   * Wait for the connection.
   */

  return await connectDB();
}

/* =========================================================
   DATABASE STATUS
========================================================= */

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

    status:
      states[readyState] ??
      "unknown",

    host:
      mongoose.connection.host ||
      null,

    database:
      mongoose.connection.name ||
      null,
  };
}

/* =========================================================
   CHECK CONNECTION
========================================================= */

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default connectDB;
