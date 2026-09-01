import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/* =========================================================
   MONGODB URI
========================================================= */

function getMongoURI(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri || typeof uri !== "string" || !uri.trim()) {
    throw new Error(
      "MONGODB_URI is missing. Please check .env.local"
    );
  }

  return uri.trim();
}

/* =========================================================
   GLOBAL CONNECTION CACHE

   Prevents multiple MongoDB connections during:
   - Next.js development
   - Hot reload
   - API route requests
========================================================= */

const cached: MongooseCache =
  global.mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
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
   * If a connection attempt is already running,
   * reuse the same promise.
   */

  if (cached.promise) {
    try {
      cached.conn = await cached.promise;

      return cached.conn;
    } catch {
      cached.promise = null;
      cached.conn = null;
    }
  }

  const uri = getMongoURI();

  /*
   * Create one shared MongoDB connection.
   */

  cached.promise = mongoose
    .connect(uri, {
      /*
       * Do not buffer database queries while
       * MongoDB is disconnected.
       */

      bufferCommands: false,

      /*
       * CONNECTION POOL

       * Increased from 10 to 20 to handle
       * concurrent Next.js API requests.
       */

      maxPoolSize: 20,

      /*
       * Keep one connection available.
       */

      minPoolSize: 1,

      /*
       * Limit simultaneous connection creation.
       */

      maxConnecting: 5,

      /*
       * Allow requests enough time to obtain
       * a connection from the pool.
       */

      waitQueueTimeoutMS: 15000,

      /*
       * DATABASE SERVER SELECTION
       */

      serverSelectionTimeoutMS: 15000,

      /*
       * INITIAL CONNECTION TIMEOUT
       */

      connectTimeoutMS: 15000,

      /*
       * SOCKET TIMEOUT
       */

      socketTimeoutMS: 45000,

      /*
       * Retry support.
       */

      retryWrites: true,

      retryReads: true,

      /*
       * Automatically reconnect when possible.
       */

      autoIndex:
        process.env.NODE_ENV !== "production",
    })
    .then((mongooseInstance) => {
      console.log(
        `MongoDB connected successfully: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`
      );

      return mongooseInstance;
    })
    .catch((error) => {
      /*
       * Reset cache after connection failure.
       * This allows the next API request to retry.
       */

      cached.promise = null;
      cached.conn = null;

      console.error(
        "MongoDB connection failed:",
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
      states[readyState] ||
      "unknown",

    host:
      mongoose.connection.host ||
      null,

    database:
      mongoose.connection.name ||
      null,

    pool: {
      maxPoolSize: 20,
      minPoolSize: 1,
      maxConnecting: 5,
      waitQueueTimeoutMS: 15000,
    },
  };
}

/* =========================================================
   DATABASE CHECK
========================================================= */

export async function isMongoConnected(): Promise<boolean> {
  return (
    mongoose.connection.readyState === 1
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default connectDB;