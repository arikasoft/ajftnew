import crypto from "crypto";

export function generateSkillApplicationId() {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(5)
    .toString("hex")
    .toUpperCase();

  return `AJFT-SKILL-${year}-${random}`;
}

export function generateStudentId() {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `AJFT-STUDENT-${year}-${random}`;
}

export function generateTemporaryPassword() {
  const random = crypto
    .randomBytes(5)
    .toString("base64")
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 8);

  return `AJFT@${random}`;
}