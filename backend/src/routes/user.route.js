import { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/Jwt.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// This is the test:
router.route("/get-user").get(authenticateToken, getUser);

export default router;
