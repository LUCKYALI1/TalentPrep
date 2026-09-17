import express from 'express';
import { getAccountDetails, deleteAccount } from '../controllers/account.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes here require authentication
router.get('/details', protect, getAccountDetails);
router.delete('/delete', protect, deleteAccount);

export default router;