import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    title: { type: String, default: "Full-Stack Engineer" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },

    // Academic Details
    degree: { type: String, default: "" },
    institution: { type: String, default: "" },
    graduationYear: { type: String, default: "" },

    // Technical Skills
    skills: { type: [String], default: [] },

    // Cloudinary Managed Image
    avatar: {
      url: { 
        type: String, 
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
      },
      public_id: { type: String, default: "" },
    },

    // Social & Professional Links
    links: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },

    // Relational Arrays
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);