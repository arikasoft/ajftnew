const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;

async function resetAdmin() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection.db;

    const password = "Ajft@2026";
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db.collection("admins").updateOne(
      { email: "admin@ajftrust.org" },
      {
        $set: {
          passwordHash,
          active: true,
          role: "admin",
          updatedAt: new Date(),
        },
      }
    );

    console.log("Matched:", result.matchedCount);
    console.log("Updated:", result.modifiedCount);

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

resetAdmin();