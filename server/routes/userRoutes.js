import express from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// User authentication and registration routes
router.post("/register", register);
router.post("/login", login);
router.post("/", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
