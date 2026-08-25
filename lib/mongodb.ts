import mongoose from "mongoose";

/* =====================================================
   MONGODB CONFIGURATION
===================================================== */

const mongodbUri = process.env.MONGODB_URI;

if (
  typeof mongodbUri !== "string" ||
  mongodbUri.trim() === ""
) {
  throw new Error(
    "MONGODB_URI is missing in .env.local"
  );
}

/*
 * After the validation above, create a guaranteed string.
 * This avoids TypeScript's string | undefined issue.
 */
const MONGODB_URI: string = mongodbUri;

/* =====================================================
   MONGOOSE CACHE
===================================================== */

type MongooseCache = {
  conn: typeof mongoose | null;
  promise:
    | Promise<typeof mongoose>
    | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | MongooseCache
    | undefined;
}

/* =====================================================
   GLOBAL CACHE
===================================================== */

const cached: MongooseCache =
  global.mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/* =====================================================
   CONNECT DATABASE
===================================================== */

async function connectDB() {
  /* -----------------------------------------------
     Already connected
  ------------------------------------------------ */

  if (cached.conn) {
    return cached.conn;
  }

  /* -----------------------------------------------
     Connection already in progress
  ------------------------------------------------ */

  if (!cached.promise) {
    cached.promise =
      mongoose.connect(
        MONGODB_URI,
        {
          bufferCommands: false,
        }
      );
  }

  /* -----------------------------------------------
     Wait for connection
  ------------------------------------------------ */

  try {
    cached.conn =
      await cached.promise;

    console.log(
      "MongoDB connected:",
      cached.conn.connection.name
    );

    return cached.conn;
  } catch (error) {
    /*
     * Reset failed promise so the next request
     * can try connecting again.
     */

    cached.promise = null;

    console.error(
      "MongoDB connection error:",
      error
    );

    throw error;
  }
}

export default connectDB;