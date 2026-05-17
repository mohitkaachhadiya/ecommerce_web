import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateRequired } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", validateRequired(["name", "email", "password"]), register);
router.post("/login", validateRequired(["email", "password"]), login);
router.post("/logout", logout);

export default router;
