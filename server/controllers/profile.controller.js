import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import {cloudinary} from "../config/cloudinary.js";

// 1. GET Current User Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    let profile = await Profile.findOne({ user: userId });

    // Auto-create blank profile document if first-time user
    if (!profile) {
      const user = await User.findById(userId);
      profile = await Profile.create({
        user: userId,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
      });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("getProfile Error:", error);
    return res.status(500).json({ message: "Failed to fetch profile details", error: error.message });
  }
};

// 2. UPDATE Profile Details & Cloudinary Avatar
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const {
      firstName,
      lastName,
      title,
      location,
      degree,
      institution,
      graduationYear,
      bio,
      skills,
      links,
      avatar, // Base64 data URL from frontend FileReader
    } = req.body;

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      profile = new Profile({ user: userId });
    }

    // Handle Cloudinary Image Upload
    if (avatar && avatar.startsWith("data:image")) {
      // Delete previously uploaded custom image from Cloudinary
      if (profile.avatar?.public_id) {
        try {
          await cloudinary.uploader.destroy(profile.avatar.public_id);
        } catch (cErr) {
          console.warn("Cloudinary old image delete failed:", cErr.message);
        }
      }

      // Upload new base64 image
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        folder: "talentprep/avatars",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" }
        ],
      });

      profile.avatar = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    } else if (avatar === "") {
      // User requested removal
      if (profile.avatar?.public_id) {
        await cloudinary.uploader.destroy(profile.avatar.public_id);
      }
      profile.avatar = {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        public_id: "",
      };
    }

    // Update Profile document fields
    profile.firstName = firstName ?? profile.firstName;
    profile.lastName = lastName ?? profile.lastName;
    profile.title = title ?? profile.title;
    profile.location = location ?? profile.location;
    profile.degree = degree ?? profile.degree;
    profile.institution = institution ?? profile.institution;
    profile.graduationYear = graduationYear ?? profile.graduationYear;
    profile.bio = bio ?? profile.bio;
    profile.skills = Array.isArray(skills) ? skills : profile.skills;
    
    if (links) {
      profile.links = {
        github: links.github ?? profile.links.github,
        linkedin: links.linkedin ?? profile.links.linkedin,
        portfolio: links.portfolio ?? profile.links.portfolio,
      };
    }

    await profile.save();

    // Synchronize firstName/lastName on User collection as well
    await User.findByIdAndUpdate(userId, {
      firstName: profile.firstName,
      lastName: profile.lastName,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
      user: {
        _id: userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: req.user.email,
        avatar: profile.avatar.url,
      }
    });
  } catch (error) {
    console.error("updateProfile Error:", error);
    return res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// 3. CHANGE Account Password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User account not found." });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password does not match our records." });
    }

    user.password = newPassword;
    await user.save(); // Triggers bcrypt pre-save hashing

    return res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("changePassword Error:", error);
    return res.status(500).json({ message: "Failed to change password", error: error.message });
  }
};