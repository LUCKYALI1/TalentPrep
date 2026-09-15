import express from 'express';
import { checkActiveInterview, archiveActiveInterview, createInterview, submitAndEvaluateInterview, getInterviewAnalytics, getInterviewById } from '../controllers/interview.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/check-active', protect, checkActiveInterview);
router.post('/archive-active', protect, archiveActiveInterview);
router.post('/create', protect, createInterview);
router.post('/:id/evaluate', protect, submitAndEvaluateInterview);
router.get('/analytics', protect, getInterviewAnalytics);
router.get('/:id', protect, getInterviewById);
export default router;