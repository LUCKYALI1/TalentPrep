import mongoose from "mongoose";
import User from "./userModel.js"; // User model import for reference

const ProfileSchema = new mongoose.Schema(
  {
    // Core relation node linking to User Authentication Identity
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Row 1: Demographics & Core Info
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    avatar: {
      url: { type: String, default: "" }, // Cloudinary safe asset url
      public_id: { type: String, default: "" }, // Cloudinary identity tracking hash
    },
    address: { type: String, default: "" },
    alternativeEmail: { type: String, default: "" },

    // Row 2: Professional Ecosystem
    skills: { type: [String], default: [] },
    jobRole: { type: String, default: "" },
    currentCompany: { type: String, default: "" },

    // Row 3: Telemetry & Platform Standing
    bio: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },

    /* 🛡️ FUTURE SCALING REFERENCE INJECTIONS (Decoupled Reference Strategy) */

    // Ek profile ka ek hi active ATS score evaluation structure ho sakta hai (One-to-One Reference)
    atsScoring: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AtsScoring", // Future model validation pointer
      default: null,
    },

    // Ek profile ke andar multiple AI assessments save ho sakte hain (One-to-Many Array Reference)
    aiAssessments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AiAssessment", // Future engine evaluation logger reference
        default: [],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Profile", ProfileSchema);
