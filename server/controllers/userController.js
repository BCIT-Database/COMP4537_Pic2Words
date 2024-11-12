import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import {
  registerUser,
  findUserByEmail,
  authenticateUser,
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

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);
    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
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
