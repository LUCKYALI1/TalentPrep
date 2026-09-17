import express from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Mount all profile endpoints behind authentication
router.get("/", protect, getProfile);
router.put("/update", protect, updateProfile);

// Password route alias (matches both frontend call patterns)
router.put("/change-password", protect, changePassword);

export default router;