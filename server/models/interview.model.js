import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: { type: String, required: true },
  targetCompany: { type: String, default: 'General Tech' },
  experienceLevel: { type: String, required: true },
  currentRole: { type: String, default: '' },
  techStack: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'],
    default: 'IN_PROGRESS'
  },
  questions: [{
    questionId: { type: String, required: true },
    questionText: { type: String, required: true },
    category: { type: String, default: 'Technical' }
  }],
  transcripts: [{
    questionId: { type: String, required: true },
    questionText: { type: String },
    userAnswerText: { type: String }
  }],
  // Flexible Schema: ScoreCard aur Gemini telemetry dono support karega
  evaluation: {
    overallScorePercentage: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
    summary: { type: String, default: '' },
    feedback: { type: String, default: '' },
    evaluations: [
      {
        questionId: { type: String },
        scorePercentage: { type: Number, default: 0 },
        feedback: { type: String, default: '' },
        idealAnswer: { type: String, default: '' }
      }
    ],
    strengths: [{ type: String }],
    improvements: [{ type: String }]
  }
}, { timestamps: true, strict: false });

export default mongoose.model('Interview', interviewSchema);