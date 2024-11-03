import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { findUserById } from "../models/userModel.js";
import { getDbConnection } from "../config/dbSelector.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the database connection based on the user's role
      const dbConnection = getDbConnection(decoded.role);
      req.db = dbConnection;

      req.user = await findUserById(decoded.userId, dbConnection);
      if (!req.user) {
        throw new Error("User not found.");
      }

      console.log("User authenticated:", req.user);
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No token provided in request");
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

export { protect };
