import express from "express";
const router = express.Router();

// controller
import { otpMailer, login, signup  } from "../controller/auth.controller.js"

router.post("/otp", otpMailer);
router.post("/login", login);
router.post("/signup", signup);

export default router;