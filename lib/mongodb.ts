import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI;

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

/* =========================================================
   ENVIRONMENT VALIDATION
========================================================= */

function getMongoURI(): string {
  const uri =
    process.env.MONGODB_URI;

  if (
    !uri ||
    typeof uri !== "string" ||
    !uri.trim()
  ) {
    throw new Error(
      "MONGODB_URI is missing in .env.local"
    );
  }

  return uri.trim();
}

/* =========================================================
   GLOBAL MONGOOSE CACHE
========================================================= */

const cached =
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

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri =
      getMongoURI();

    cached.promise =
      mongoose.connect(
        uri,
        {
          bufferCommands: false,
        }
      );
  }

  try {
    cached.conn =
      await cached.promise;

    console.log(
      "MongoDB connected:",
      cached.conn.connection.name
    );

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;

    console.error(
      "MongoDB connection error:",
      error
    );

    throw error;
  }
}

export default connectDB;