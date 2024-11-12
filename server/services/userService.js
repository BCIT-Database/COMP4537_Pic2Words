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

// Request password reset service
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `https://stingray-app-jmrty.ondigitalocean.app/reset-password/${token}`;

  // sending password reset email
  await sendPasswordResetEmail(email, resetLink);

  return "Password reset email sent";
};

// Reset user password service
export const resetUserPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }

    // new password hashing
    user.password = await hashPassword(newPassword);
    await user.save();

    return "Password has been reset successfully";
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
