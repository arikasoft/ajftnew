require("dotenv").config({
  path: ".env.local",
});

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

async function resetAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection.db;

    // Mongoose default collection name for Admin model
    const admins = db.collection("admins");

    const email = "admin@ajftrust.org";

    // NEW PASSWORD
    const password = "ArikaSoft@#$2026";

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    const existing = await admins.findOne({
      email: email.toLowerCase(),
    });

    if (!existing) {
      console.log("");
      console.log("=================================");
      console.log("ADMIN NOT FOUND");
      console.log("=================================");
      console.log("Email:", email);
      console.log("");
      console.log(
        "Existing admin create karne ke liye"
      );
      console.log(
        "create-admin script use karein."
      );
      console.log("");

      return;
    }

    await admins.updateOne(
      {
        _id: existing._id,
      },
      {
        $set: {
          passwordHash,
          active: true,
          updatedAt: new Date(),
        },
      }
    );

    console.log("");
    console.log("=================================");
    console.log("AJFT ADMIN PASSWORD RESET");
    console.log("=================================");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", existing.role);
    console.log("Active: true");
    console.log("=================================");
    console.log("");
    console.log(
      "Login: https://ajftrust.org/admin/login/"
    );
    console.log("");

  } catch (error) {
    console.error(
      "Admin password reset failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

resetAdmin();