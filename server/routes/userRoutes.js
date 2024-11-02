import express from "express";

import { register, login } from "../controllers/userController.js";

const router = express.Router();

// User authentication and registration routes
router.post("/register", register);
router.post("/login", login);

export default router;
