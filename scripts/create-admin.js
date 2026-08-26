require("dotenv").config({ path: ".env.local" });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;
  const admins = db.collection("admin");

  const email = "admin@ajftrust.org";
  const password = "ArikaSoft@#$2026";

  const existing = await admins.findOne({ email });

  if (existing) {
    console.log("Admin already exists:", email);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await admins.insertOne({
    name: "AJFT Administrator",
    email,
    passwordHash,
    role: "admin",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("=================================");
  console.log("AJFT ADMIN CREATED");
  console.log("Email:", email);
  console.log("Role: admin");
  console.log("=================================");

  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error("Admin creation failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});