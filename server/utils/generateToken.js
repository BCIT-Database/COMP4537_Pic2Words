import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (userId, email, role) => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({ userId, email, role }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export default generateToken;
