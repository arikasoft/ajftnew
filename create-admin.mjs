import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing");
}

await mongoose.connect(MONGODB_URI);

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  active: Boolean,
});

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);

const email = "admin@ajftrust.org";
const password = "ChangeMe@2026";

const passwordHash = await bcrypt.hash(password, 12);

await Admin.findOneAndUpdate(
  { email },
  {
    name: "AJFT Administrator",
    email,
    passwordHash,
    role: "superadmin",
    active: true,
  },
  {
    upsert: true,
    new: true,
  }
);

console.log("=================================");
console.log("ADMIN CREATED SUCCESSFULLY");
console.log("Email:", email);
console.log("Password:", password);
console.log("Role: superadmin");
console.log("Active: true");
console.log("=================================");

await mongoose.disconnect();