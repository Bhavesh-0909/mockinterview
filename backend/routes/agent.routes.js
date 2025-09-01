import express from "express";
const router = express.Router();

// controller
import { chatAPI  } from "../controller/agent.controller.js"

router.post("/chat", chatAPI);

export default router;