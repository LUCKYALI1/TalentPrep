import interviewService from "../services/interview.service.js";
import { generateQuestionsFromAI, evaluateInterviewFromAI } from '../services/gemini.service.js';
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"; 
import fs from "fs";
import path from "path";
// 👇 Apna interview model import karna mat bhoolna database check ke liye
import Interview from "../models/interview.model.js"; 

const STORAGE_DIR = path.join(process.cwd(), "sessions");

// Ensure session directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

class InterviewController {
  /**
   * @desc    Schedule a new interview session in DB
   * @route   POST /api/v1/interviews/schedule
   */
  async schedule(req, res, next) {
    try {
      const userId = req.user?._id || req.body.userId || "temp-guest-id";
      const { forceCreate } = req.body; // 👈 Frontend se aayega

      // =========================================================
      // 🔥 NEW LOGIC: Check for ongoing interviews
      // =========================================================
      if (userId !== "temp-guest-id") { // Guest user ke liye skip kar sakte hain
        // STEP 1: Agar forceCreate false ya undefined hai
        if (!forceCreate) {
          const existingInterview = await Interview.findOne({
            userId,
            status: { $in: ["scheduled", "in-progress"] } 
          });

          // Agar active interview mil gaya, toh frontend ko modal dikhane ke liye bhejo
          if (existingInterview) {
            return res.status(200).json({
              hasOngoingInterview: true,
              message: "You already have an active interview.",
              existingInterviewId: existingInterview._id
            });
          }
        }

        // STEP 2: Agar user ne bola 'Yes' (forceCreate: true) toh purane cancel karo
        if (forceCreate) {
          await Interview.updateMany(
            { userId, status: { $in: ["scheduled", "in-progress"] } },
            { $set: { status: "cancelled" } }
          );
        }
      }
      // =========================================================

      // 1. Force Advanced Instant Flow Metrics
      const instantPayload = {
        ...req.body,
        isInstant: true,
        scheduledAt: new Date().toISOString(), // 👈 Time strictly set to NOW
        status: 'scheduled' // (Aapke schema me lowercase enum hai)
      };

      // 2. Create Interview using existing logic
      const interview = await interviewService.createScheduledInterview(
        userId,
        instantPayload
      );

      // 3. Return exact format your frontend AIInterview.jsx expects
      return res
        .status(201)
        .json(
          new ApiResponse(201, interview, "Instant Interview created successfully")
        );
    } catch (error) {
      console.error("[SCHEDULER CRASH PROTECT]:", error.message);
      // Fallback: Agar Profile module ya DB crash ho jaye to frontend block na ho
      const fallbackInterview = {
         _id: `INSTANT-FALLBACK-${Date.now()}`,
         ...req.body,
         scheduledAt: new Date().toISOString(),
         isInstant: true
      };
      return res.status(201).json(new ApiResponse(201, fallbackInterview, "Fallback Instant Session Started"));
    }
  }

  /**
   * @desc    Start/Initialize interview session & generate questions via Gemini
   * @route   POST /api/v1/interviews/start
   */
  async startSession(req, res, next) {
    try {
      const { interviewId, role, jobRole, techStack, yearOfExperience, experienceLevel } = req.body;

      const activeRole = role || jobRole;
      const activeYoE = yearOfExperience || experienceLevel || 0;

      if (!interviewId || !activeRole) {
        return res.status(400).json({
          success: false,
          message: "interviewId and job role are required fields",
        });
      }

      // 1. Gemini AI se Role, Stack aur YoE ke basis par questions generate karein
      const questions = await generateQuestionsFromAI(
        activeRole,
        techStack || [],
        activeYoE
      );

      // 2. Session Payload construct karein
      const sessionData = {
        interviewId,
        role: activeRole,
        techStack: techStack || [],
        yearOfExperience: activeYoE,
        status: "IN_PROGRESS",
        createdAt: new Date().toISOString(),
        qaPairs: questions.map((q, index) => ({
          id: index + 1,
          question: q,
          answer: "",
        })),
      };

      // 3. Session File save karein
      const filePath = path.join(STORAGE_DIR, `${interviewId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));

      return res.status(201).json(
        new ApiResponse(
          201,
          {
            interviewId,
            role: activeRole,
            yearOfExperience: activeYoE,
            questions,
          },
          "Interview session initialized and questions generated successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Save/Update individual question answer
   * @route   PATCH /api/v1/interviews/:id/answers
   */
  async saveAnswer(req, res, next) {
    try {
      const { id: interviewId } = req.params;
      const { questionIndex, answerText } = req.body;

      const filePath = path.join(STORAGE_DIR, `${interviewId}.json`);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "Interview session record not found",
        });
      }

      const sessionData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      if (questionIndex < 0 || questionIndex >= sessionData.qaPairs.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid question index provided",
        });
      }

      // Update question's answer
      sessionData.qaPairs[questionIndex].answer = answerText || "";
      fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));

      return res.status(200).json(
        new ApiResponse(
          200,
          { questionIndex, saved: true },
          `Answer for question ${questionIndex + 1} recorded successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Evaluate complete interview using Gemini
   * @route   POST /api/v1/interviews/:id/evaluate
   */
  async evaluate(req, res, next) {
    try {
      const { id: interviewId } = req.params;
      const filePath = path.join(STORAGE_DIR, `${interviewId}.json`);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "Interview session record not found",
        });
      }

      const sessionData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Gemini Evaluation API Call
      const evaluationResult = await evaluateInterviewFromAI(
        sessionData.role,
        sessionData.yearOfExperience,
        sessionData.qaPairs
      );

      sessionData.status = "COMPLETED";
      sessionData.evaluation = evaluationResult;
      fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));

      return res.status(200).json(
        new ApiResponse(
          200,
          evaluationResult,
          "Interview evaluation generated successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new InterviewController();