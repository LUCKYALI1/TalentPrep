import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    jobRole: {
      type: String,
      required: true,
    },
    companyTier: {
      type: String,
      default: "Tier 2 (High-Growth Startups)",
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    scheduledAt: {
      type: Date,
      default: Date.now,
    },
    isInstant: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);