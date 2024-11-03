import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";

// Register a new user
export const registerUser = async (email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const userId = await createUser(email, password);
  return userId;
};

// Authenticate user
export const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password.");
  }

  return user;
};
