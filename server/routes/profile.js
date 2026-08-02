import express from 'express';
import { updateProfile  } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js'; // Apne project structure ke hisab se auth path verify kar lena
import { upload } from '../config/cloudinary.js';
import { getProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route Node matching Profile UI Form Data uploads
router.put('/update-profie', protect, upload.single('avatar'), updateProfile);
router.get('/get-profile', protect, getProfile);

export default router;