import express from "express";
const router = express.Router();

import { getFeedback, postFeedback } from "../controller/feedback.controller.js";

router.get("/", getFeedback);
router.post("/", postFeedback);

export default router;