import mongoose from 'mongoose';
import Interview from '../models/interview.model.js';
import { generateInterviewQuestions, evaluateInterview } from '../services/gemini.service.js';

// Safe User ID Extractor & Query Builder (Prevents ObjectId vs String mismatches)
const buildUserQuery = (req) => {
  const rawId = req.user?._id || req.user?.id || req.user?.userId || req.userId;
  if (!rawId) return null;

  if (mongoose.Types.ObjectId.isValid(rawId)) {
    const objId = new mongoose.Types.ObjectId(rawId);
    return { $in: [objId, String(rawId)] };
  }
  return rawId;
};

// 1. Check for Active / Unfinished Session in Queue
export const checkActiveInterview = async (req, res) => {
  try {
    const userQuery = buildUserQuery(req);
    if (!userQuery) {
      return res.status(401).json({ success: false, message: 'Unauthorized session' });
    }

    // Finds any session currently in PENDING or IN_PROGRESS state
    const activeInterview = await Interview.findOne({
      userId: userQuery,
      status: { $in: ['PENDING', 'IN_PROGRESS'] }
    }).sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: true,
      hasActive: Boolean(activeInterview), 
      activeInterview: activeInterview || null 
    });
  } catch (error) {
    console.error('❌ [checkActiveInterview Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to verify active session', error: error.message });
  }
};

// 2. Archive Current Active Session to Allow Fresh Setup
export const archiveActiveInterview = async (req, res) => {
  try {
    const userQuery = buildUserQuery(req);
    if (!userQuery) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await Interview.updateMany(
      { userId: userQuery, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
      { $set: { status: 'ARCHIVED' } }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Active sessions successfully archived',
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error('❌ [archiveActiveInterview Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to archive active sessions', error: error.message });
  }
};

// 3. Create New Interview Session
export const createInterview = async (req, res) => {
  try {
    const rawUserId = req.user?._id || req.user?.id || req.user?.userId || req.userId;
    if (!rawUserId) {
      return res.status(401).json({ success: false, message: 'User authentication required. Please log in again.' });
    }

    const { targetRole, targetCompany, experienceLevel, currentRole, techStack } = req.body;

    if (!targetRole || !techStack) {
      return res.status(400).json({ success: false, message: 'Target role and tech stack are required.' });
    }

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()).filter(Boolean) : []);

    const userQuery = buildUserQuery(req);

    // Archive any existing active sessions so only one session remains live
    await Interview.updateMany(
      { userId: userQuery, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
      { $set: { status: 'ARCHIVED' } }
    );

    // Generate real questions via Gemini API
    const questions = await generateInterviewQuestions({
      targetRole,
      targetCompany,
      experienceLevel,
      currentRole,
      techStack: parsedTechStack
    });

    // Save session with a guaranteed ObjectId userId
    const safeUserId = mongoose.Types.ObjectId.isValid(rawUserId) 
      ? new mongoose.Types.ObjectId(rawUserId) 
      : rawUserId;

    const newInterview = await Interview.create({
      userId: safeUserId,
      targetRole,
      targetCompany: targetCompany || 'General Tech',
      experienceLevel: experienceLevel || 'Entry Level',
      currentRole: currentRole || 'Candidate',
      techStack: parsedTechStack.length > 0 ? parsedTechStack : ['General Engineering'],
      questions,
      status: 'IN_PROGRESS'
    });

    return res.status(201).json({
      success: true,
      interviewId: newInterview._id,
      questions: newInterview.questions
    });

  } catch (error) {
    console.error('❌ [createInterview Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating interview session'
    });
  }
};

// 4. Submit & Score Interview
export const submitAndEvaluateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { transcripts } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid interview ID format.' });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    // Call evaluation engine
    const evaluation = await evaluateInterview({
      targetRole: interview.targetRole,
      experienceLevel: interview.experienceLevel,
      techStack: interview.techStack,
      transcripts: transcripts || []
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
    console.error('❌ [submitAndEvaluateInterview Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to evaluate interview', error: error.message });
  }
};

// 5. Get Analytics
export const getInterviewAnalytics = async (req, res) => {
  try {
    const userQuery = buildUserQuery(req);
    if (!userQuery) return res.status(401).json({ message: 'Unauthorized' });

    const interviews = await Interview.find({ 
      userId: userQuery, 
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

// 6. Get Interview by ID
export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const userQuery = buildUserQuery(req);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid interview ID format.' });
    }

    const interview = await Interview.findOne({ _id: id, userId: userQuery });
    if (!interview) {
      return res.status(404).json({ message: 'Interview record not found or access denied.' });
    }

    return res.status(200).json({ success: true, interview });
  } catch (error) {
    console.error('Error fetching interview by ID:', error);
    return res.status(500).json({ message: 'Failed to fetch interview details', error: error.message });
  }
};