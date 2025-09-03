import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// Token Generate
export const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "24h" });
};

// Hashing Pass
export const hashPassword = async (pass) => {
  return bcrypt.hash(pass, saltRounds);
};

// Check Password
export const checkPass = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
