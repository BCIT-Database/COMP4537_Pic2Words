import express from "express";

const router = express.Router();

router.get("/home", (req, res) => {
  console.log("Home route accessed");
});

export default router;
