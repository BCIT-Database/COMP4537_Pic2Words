import {
  createUser,
  findUserByEmail as findUserByEmailDB,
  updateUserPassword,
  findUserById,
  getAllUsersWithAPIUsage,
} from "../models/userModel.js";
import { sendPasswordResetEmail } from "./emailService.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const base_url = process.env.ALLOWED_ORIGINS;

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

// Request password reset service
export const requestPasswordReset = async (email) => {
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const token = generateToken(user.user_id, user.email, user.role);
  const resetLink = base_url + `/reset-password/${token}`;

  // sending password reset email
  await sendPasswordResetEmail(email, resetLink);

  return "Password reset email sent";
};

// Reset user password service
export const resetUserPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token userId:", decoded.userId);
    // Find user by ID
    const user = await findUserById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password in the database
    await updateUserPassword(user.user_id, hashedPassword);

    return "Password has been reset successfully";
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Service to fetch all users with API usage information
export const fetchAllUsersWithAPIUsageService = async (role = "admin") => {
  try {
    // Fetch user and API usage data from the database
    const usersWithAPIUsage = await getAllUsersWithAPIUsage(role);

    // Return the fetched data
    return usersWithAPIUsage;
  } catch (error) {
    console.error("Error in fetchAllUsersWithAPIUsageService:", error.message);
    throw new Error("Failed to fetch all users with API usage information.");
  }
};
