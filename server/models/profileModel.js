import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    // Core relation link
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Demographics & Professional Info
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    avatar: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    address: { type: String, default: "" },
    alternativeEmail: { type: String, default: "" },
    skills: { type: [String], default: [] },
    jobRole: { type: String, default: "" },
    currentCompany: { type: String, default: "" },
    bio: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },

    /* 🛡️ ECOSYSTEM REFERENCES (One-to-Many Arrays) */

    // List of Interview IDs linked to this profile
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],

    // Notifications linked to this user/profile
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],

    // Future ATS Evaluations
    atsScoring: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AtsScoring",
      },
    ],

    aiAssessments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AiAssessment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);