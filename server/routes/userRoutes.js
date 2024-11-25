import express from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User authentication and registration routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
