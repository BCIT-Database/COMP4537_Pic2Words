import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { registerUser, authenticateUser } from "../services/userService.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authenticateUser(email, password);
  console.log("User found for login:", user);

  if (user) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
