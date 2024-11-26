import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export default generateToken;
