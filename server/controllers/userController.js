import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import {
  registerUser,
  findUserByEmail,
  authenticateUser,
  requestPasswordReset,
  resetUserPassword,
  fetchAllUsersWithAPIUsageService,
} from "../services/userService.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Registering user with email:", email);

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "This email is already registered." });
  }

  const user = await registerUser(email, password);
  res.status(201).json({
    _id: user.userId,
    email: user.email,
  });
});

// @desc    Get authenticated user info
// @route   GET /api/users/me
// @access  Private
export const getAuthenticatedUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);
    const token = generateToken(user.id, user.email, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  try {
    // Check if the user has admin privileges
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Call the service to get the user and API usage data
    const users = await fetchAllUsersWithAPIUsageService();

    // Respond with the data
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch data" });
  }
});

// @desc    Request password reset
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const message = await requestPasswordReset(email);
  res.json({ message });
});

// @desc    Reset user password
// @route   POST /api/users/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log("Resetting password with token:", token);
  console.log("New password", req.body.password);
  const { password } = req.body;
  const message = await resetUserPassword(token, password);
  res.json({ message });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});
