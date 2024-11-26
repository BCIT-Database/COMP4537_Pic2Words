import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  getAuthenticatedUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User authentication and registration routes
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user authentication and profile management
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get authenticated user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Add this if using JWT for authentication
 *     responses:
 *       200:
 *         description: Successfully fetched user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *       401:
 *         description: Unauthorized
 */
router.get("/me", getAuthenticatedUser);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: P@ssw0rd
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post("/logout", logout);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Add this if using JWT for authentication
 *     responses:
 *       200:
 *         description: Successfully fetched profile
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, getProfile);

// Password reset routes
/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: NewP@ssw0rd
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or request
 */
router.post("/reset-password/:token", resetPassword);

export default router;
