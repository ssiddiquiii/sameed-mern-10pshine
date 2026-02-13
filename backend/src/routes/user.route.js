import { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/Jwt.js";
import { forgotPassword, resetPassword } from "../controllers/user.controller.js";

const router = Router();

// Routes definition
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// This is the test:
router.route("/get-user").get(authenticateToken, getUser);

export default router;
