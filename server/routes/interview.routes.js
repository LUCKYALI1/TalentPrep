import express from "express";
import interviewController from "../controllers/interview.controller.js";

const router = express.Router();

// 1. Direct Instant Start Session Endpoint
router.post("/start", (req, res, next) => {
    interviewController.startSession(req, res, next);
});

// 2. Schedule Endpoint
router.post("/schedule", (req, res, next) => {
    interviewController.schedule(req, res, next);
});

// 3. Save User Answer Endpoint
router.patch("/:id/answers", (req, res, next) => {
    interviewController.saveAnswer(req, res, next);
});

// 4. Trigger Gemini Final Evaluation Endpoint
router.post("/:id/evaluate", (req, res, next) => {
    // 👇 FIXED: evaluateSession ki jagah siraf evaluate aayega
    interviewController.evaluate(req, res, next); 
});

export default router;