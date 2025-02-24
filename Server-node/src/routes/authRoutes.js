import express from "express";
import { registerUser, loginUser, registerOwner, loginOwner } from "../controllers/authController.js"; // ✅ Use `import`

const router = express.Router();

// Customer routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Owner routes
router.post("/owner/register", registerOwner);
router.post("/owner/login", loginOwner);

export default router; // ✅ Correct ES Module export

