import Interview from '../models/interview.model.js';
import { generateInterviewQuestions, evaluateInterview } from '../services/gemini.service.js';

export const checkActiveInterview = async (req, res) => {
  try {
    const userId = req.user._id;
    const activeInterview = await Interview.findOne({
      userId,
      status: { $in: ['PENDING', 'IN_PROGRESS'] }
    }).sort({ createdAt: -1 });

    if (activeInterview) {
      return res.status(200).json({ hasActive: true, activeInterview });
    }
    return res.status(200).json({ hasActive: false });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify active session', error: error.message });
  }
};

export const archiveActiveInterview = async (req, res) => {
  try {
    const userId = req.user._id;
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
    const userId = req.user?._id;
    const { targetRole, targetCompany, experienceLevel, currentRole, techStack } = req.body;

    if (!targetRole || !techStack) {
      return res.status(400).json({ message: 'Target role and tech stack are required.' });
    }

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : []);

    await Interview.updateMany(
      { userId, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
      { $set: { status: 'ARCHIVED' } }
    );

    const questions = await generateInterviewQuestions({
      targetRole,
      targetCompany,
      experienceLevel,
      techStack: parsedTechStack
    });

    if (!questions || !Array.isArray(questions)) {
      return res.status(500).json({ message: 'Failed to generate interview questions from AI service.' });
    }

    const newInterview = await Interview.create({
      userId,
      targetRole,
      targetCompany,
      experienceLevel,
      currentRole,
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
    console.error('CRASH PREVENTED IN createInterview:', error);

    const is503 = error.status === 503 || error.message?.includes('503');
    return res.status(is503 ? 503 : 500).json({
      message: is503 
        ? 'AI service is under heavy load right now. Please try again in a few seconds.' 
        : 'Error creating interview session',
      error: error.message
    });
  }
};

export const submitAndEvaluateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { transcripts } = req.body;

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
    console.error('CRASH PREVENTED IN submitAndEvaluateInterview:', error);
    return res.status(500).json({ message: 'Failed to evaluate interview', error: error.message });
  }
};