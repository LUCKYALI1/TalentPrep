import Profile from '../models/profileModel.js';
import { cloudinary } from '../config/cloudinary.js';
import User from '../models/userModel.js'; // User model import for reference

// ==================== 1. GET PROFILE (WITH USER POPULATION) ====================
export const getProfile = async (req, res) => {
  try {
    // ⚡ Query directly on Profile model and fetch linked User identifiers
    let profile = await Profile.findOne({ user: req.user._id }).populate({
      path: 'user',
      select: 'username email' // Sirf zaroori field select karein, password bypass rahega
    });

    // Strategy: Agar user pehli baar dashboard khol raha hai aur profile document exist nahi karta, 
    // to crash karne ke bajaye safely ek default schema instantiate kar do
    if (!profile) {
      profile = await Profile.create({ 
        user: req.user._id,
        firstName: req.user.firstName || "",
        lastName: req.user.lastName || ""
      });
      
      // Nayi create hui profile ko fir se populate kar lo dynamic response ke liye
      await profile.populate({ path: 'user', select: 'username email' });
    }

    // ⚡ Frontend state structure matching payload injection
    // Frontend component states properties ko direct base flat layout par expect kar rahi hain
    const responsePayload = {
      ...profile._doc, // Saare profile metrics array/string structure copy
      username: profile.user?.username || 'candidate_node',
      email: profile.user?.email || ''
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("Backend Core Error in getProfile Node:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server telemetry parsing error.", 
      error: error.message 
    });
  }
};

// ==================== 2. UPDATE PROFILE (WITH USER POPULATION) ====================
export const updateProfile = async (req, res) => {
  try {
    const {
      firstName, lastName, address, alternativeEmail, 
      skills, jobRole, currentCompany, bio, experienceYears, 
      githubUrl, linkedinUrl
    } = req.body;

    // Skills handling logic validation (bina original matrix disrupt kiye)
    // Postman payload ya multi-form inputs comma separated string ho sakte hain, ensure array format
    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    }

    // Basic update content pipeline construct
    const updateData = {
      firstName,
      lastName,
      address,
      alternativeEmail,
      jobRole,
      currentCompany,
      bio,
      experienceYears: Number(experienceYears) || 0,
      githubUrl,
      linkedinUrl,
      skills: skillsArray
    };

    // ⚡ Memory storage stream configuration for Cloudinary processing check
    // Agar Multer ne buffer stream pipe forward kiya hai to use file upload layer mein process karein
    if (req.file && req.cloudinaryResult) {
      updateData.avatar = {
        url: req.cloudinaryResult.secure_url,
        public_id: req.cloudinaryResult.public_id
      };
    }

    // Database safe upsert operation execution
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true, upsert: true }
    ).populate({
      path: 'user',
      select: 'username email'
    });

    // Structural dashboard sync output matching layout context
    const responsePayload = {
      ...updatedProfile._doc,
      username: updatedProfile.user?.username || 'candidate_node',
      email: updatedProfile.user?.email || ''
    };

    return res.status(200).json({
      success: true,
      message: "Telemetry profile synchronized successfully!",
      profile: responsePayload
    });

  } catch (error) {
    console.error("Backend Error in updateProfile Node:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Data sync failed during write instance.", 
      error: error.message 
    });
  }
};