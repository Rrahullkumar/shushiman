const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  registerOwner,
  loginOwner
} = require("../controllers/authController");

// Customer routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Owner routes
router.post("/owner/register", registerOwner);
router.post("/owner/login", loginOwner);

module.exports = router;
