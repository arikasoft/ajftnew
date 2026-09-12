const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

const EMAIL = "admin@ajftrust.org";
const PASSWORD = "ArikaSoft@#$2026";

async function main() {
  console.log("Connecting to MongoDB...");

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected.");
  console.log("Database:", mongoose.connection.db.databaseName);
  console.log("Collection: admins");

  const admins = mongoose.connection.db.collection("admins");

  const passwordHash = await bcrypt.hash(PASSWORD, 12);

  const existingAdmin = await admins.findOne({
    email: EMAIL,
  });

  if (existingAdmin) {
    await admins.updateOne(
      { _id: existingAdmin._id },
      {
        $set: {
          passwordHash,
          role: "admin",
          active: true,
          updatedAt: new Date(),
        },
      }
    );

    console.log("");
    console.log("==============================");
    console.log("ADMIN PASSWORD RESET SUCCESS");
    console.log("==============================");
    console.log("Email:", EMAIL);
    console.log("Role: admin");
    console.log("Active: true");
    console.log("==============================");
  } else {
    const result = await admins.insertOne({
      name: "AJFT Administrator",
      email: EMAIL,
      passwordHash,
      role: "admin",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("");
    console.log("==============================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("==============================");
    console.log("Inserted ID:", result.insertedId.toString());
    console.log("Email:", EMAIL);
    console.log("Role: admin");
    console.log("Active: true");
    console.log("==============================");
  }

  const verify = await admins.findOne(
    { email: EMAIL },
    {
      projection: {
        email: 1,
        role: 1,
        active: 1,
        passwordHash: 1,
      },
    }
  );

  console.log("");
  console.log("DATABASE VERIFICATION:");
  console.log({
    email: verify?.email,
    role: verify?.role,
    active: verify?.active,
    hasPasswordHash: !!verify?.passwordHash,
  });

  await mongoose.disconnect();
  console.log("MongoDB disconnected.");
}

main().catch(async (error) => {
  console.error("");
  console.error("ADMIN SETUP FAILED");
  console.error(error);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
});