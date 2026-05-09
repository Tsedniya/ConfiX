const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

