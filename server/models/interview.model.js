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
    default: 'PENDING'
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
  evaluation: {
    overallScore: { type: Number, default: 0 },
    technicalRating: { type: Number, default: 0 },
    communicationRating: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    strengths: [{ type: String }],
    improvements: [{ type: String }]
  }
}, { timestamps: true });
export default mongoose.model('Interview', interviewSchema);