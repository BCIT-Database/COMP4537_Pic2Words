import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protect = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      req.user = decoded; // { userId, role }

      // Check if the user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  });
