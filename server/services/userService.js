import {
  createUser,
  findUserByEmail as findUserByEmailDB,
} from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (email, password) => {
  const existingUser = await findUserByEmailDB(email);
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("Calling createUser function with email and password");
  const userId = await createUser(email, hashedPassword);
  return { userId, email };
};

export const findUserByEmail = async (email) => {
  return await findUserByEmailDB(email);
};

// Authenticate user
export const authenticateUser = async (email, password) => {
  const user = await findUserByEmailDB(email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password.");
  }

  // when user is found and password matches, return user
  return user;
};
