import mongoose from 'mongoose';
import Interview from '../models/interview.model.js';
import { generateInterviewQuestions, evaluateInterview } from '../services/gemini.service.js';

export const checkActiveInterview = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized session' });
    }

    const activeInterview = await Interview.findOne({
      userId,
      status: { $in: ['PENDING', 'IN_PROGRESS'] }
    }).sort({ createdAt: -1 });

    return res.status(200).json({ hasActive: !!activeInterview, activeInterview });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify active session', error: error.message });
  }
};

export const archiveActiveInterview = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.userId;
    await Interview.updateMany(
      { userId, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
      { $set: { status: 'ARCHIVED' } }
    );
    return res.status(200).json({ message: 'Previous session moved to queue' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to queue session', error: error.message });
  }
};

export const createInterview = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User authentication required. Please login again.' });
    }

    const { targetRole, targetCompany, experienceLevel, currentRole, techStack } = req.body;

    if (!targetRole || !techStack) {
      return res.status(400).json({ message: 'Target role and tech stack are required.' });
    }

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()).filter(Boolean) : []);

    // 1. Move old active sessions to archived
    await Interview.updateMany(
      { userId, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
      { $set: { status: 'ARCHIVED' } }
    );

    // 2. Generate questions (Gemini + Auto-Fallback)
    const questions = await generateInterviewQuestions({
      targetRole,
      targetCompany,
      experienceLevel,
      currentRole,
      techStack: parsedTechStack
    });

    // 3. Save session
    const newInterview = await Interview.create({
      userId,
      targetRole,
      targetCompany: targetCompany || 'General Tech',
      experienceLevel,
      currentRole: currentRole || 'Candidate',
      techStack: parsedTechStack,
      questions,
      status: 'IN_PROGRESS'
    });

    return res.status(201).json({
      success: true,
      interviewId: newInterview._id,
      questions: newInterview.questions
    });

  } catch (error) {
    console.error('❌ [createInterview Catch]:', error.message);
    return res.status(500).json({
      message: error.message || 'Error creating interview session',
      error: error.message
    });
  }
};

export const submitAndEvaluateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { transcripts } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid interview ID format.' });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    const evaluation = await evaluateInterview({
      targetRole: interview.targetRole,
      experienceLevel: interview.experienceLevel,
      techStack: interview.techStack,
      transcripts
    });

    interview.transcripts = transcripts;
    interview.evaluation = evaluation;
    interview.status = 'COMPLETED';
    await interview.save();

    return res.status(200).json({
      success: true,
      message: 'Interview evaluated successfully',
      evaluation
    });
  } catch (error) {
    console.error('❌ [submitAndEvaluateInterview Catch]:', error.message);
    return res.status(500).json({ message: 'Failed to evaluate interview', error: error.message });
  }
};

export const getInterviewAnalytics = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const interviews = await Interview.find({ 
      userId, 
      status: 'COMPLETED' 
    }).sort({ createdAt: 1 });

    const totalInterviews = interviews.length;

    if (totalInterviews === 0) {
      return res.status(200).json({
        totalInterviews: 0,
        overallScore: 0,
        highScoresCount: 0,
        trendData: [],
        recentInterviews: []
      });
    }

    const scores = interviews.map(i => i.evaluation?.overallScorePercentage || i.evaluation?.overallScore || 0);
    const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalInterviews);
    const highScoresCount = scores.filter(s => s >= 80).length;

    const trendData = interviews.map((inv, idx) => ({
      session: `Session ${idx + 1}`,
      score: inv.evaluation?.overallScorePercentage || inv.evaluation?.overallScore || 0,
      role: inv.targetRole
    }));

    // Pass the full 24-character _id for database operations
    const recentInterviews = interviews.slice(-10).reverse().map(inv => ({
      _id: inv._id.toString(),
      id: inv._id.toString(),
      displayId: inv._id.toString().slice(-6).toUpperCase(),
      role: inv.targetRole,
      targetCompany: inv.targetCompany || 'General Tech',
      date: new Date(inv.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '30 mins',
      score: inv.evaluation?.overallScorePercentage || inv.evaluation?.overallScore || 0,
      status: (inv.evaluation?.overallScorePercentage || inv.evaluation?.overallScore || 0) >= 80 ? 'Passed' : 'Needs Review'
    }));

    return res.status(200).json({
      totalInterviews,
      overallScore,
      highScoresCount,
      trendData,
      recentInterviews
    });
  } catch (err) {
    console.error('Analytics Error:', err);
    return res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id || req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid interview ID format.' });
    }

    const interview = await Interview.findOne({ _id: id, userId });
    if (!interview) {
      return res.status(404).json({ message: 'Interview record not found or access denied.' });
    }

    return res.status(200).json({ success: true, interview });
  } catch (error) {
    console.error('Error fetching interview by ID:', error);
    return res.status(500).json({ message: 'Failed to fetch interview details', error: error.message });
  }
};