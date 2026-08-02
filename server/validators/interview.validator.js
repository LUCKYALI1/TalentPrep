import { body } from "express-validator";

export const scheduleInterviewValidation = [
  body("jobRole").trim().notEmpty().withMessage("Job role is required"),
  body("companyTier").notEmpty().withMessage("Company tier is required"),
  body("experienceYears").isNumeric().withMessage("Experience must be a number"),
  body("techStack").isArray({ min: 1 }).withMessage("Select at least one skill in tech stack"),
  body("scheduledAt").isISO8601().withMessage("Invalid date format"),
  body("isInstant").optional().isBoolean()
];