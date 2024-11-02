import express from "express";

const router = express.Router();

router.get("/home", (req, res) => {
  res.json({ message: "Home page" });
});

export default router;
