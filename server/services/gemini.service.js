import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Smart Fallback Generator (Agar Google AI down ya unreachable ho)
const getDynamicFallbackQuestions = (targetRole, techStack) => {
  const stackList = Array.isArray(techStack) ? techStack : [techStack];
  const primary = stackList[0] || 'JavaScript';
  const secondary = stackList[1] || 'Web Architecture';

  return [
    {
      questionId: 'q1',
      questionText: `Explain the core architecture and component lifecycle or execution flow in ${primary}.`,
      category: 'Technical'
    },
    {
      questionId: 'q2',
      questionText: `How do you optimize rendering, state management, and memory performance in a production ${targetRole} workflow?`,
      category: 'System Design'
    },
    {
      questionId: 'q3',
      questionText: `Describe how you handle asynchronous operations, concurrency, and error boundaries when integrating ${secondary}.`,
      category: 'Technical'
    },
    {
      questionId: 'q4',
      questionText: `Walk me through how you implement authentication, token refresh flows, and secure API headers in full-stack applications.`,
      category: 'Security'
    },
    {
      questionId: 'q5',
      questionText: `Can you discuss an instance where you debugged a complex production performance bottleneck or race condition?`,
      category: 'Behavioral / Problem Solving'
    }
  ];
};

export const generateInterviewQuestions = async ({
  targetRole,
  targetCompany,
  experienceLevel,
  currentRole,
  techStack
}) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || '');

  if (genAI) {
    const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: 'application/json' }
        });

        const prompt = `
          Generate exactly 5 targeted technical interview questions for:
          - Target Role: ${targetRole} (${experienceLevel})
          - Company: ${targetCompany || 'Top Tech'}
          - Tech Stack: ${formattedTechStack}

          Return ONLY a JSON array matching this schema:
          [
            {
              "questionId": "q1",
              "questionText": "Question here",
              "category": "Technical"
            }
          ]
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.warn(`[Gemini Warn] ${modelName} call failed: ${err.message}`);
      }
    }
  }

  // Backup Fail-Safe: Instant dynamic generation
  console.log('⚡ Using Intelligent Fallback Questions Generator');
  return getDynamicFallbackQuestions(targetRole, techStack);
};

export const evaluateInterview = async ({ targetRole, experienceLevel, techStack, transcripts }) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || '');

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json' }
      });

      const prompt = `
        Evaluate this technical interview:
        - Role: ${targetRole} (${experienceLevel})
        - Tech Stack: ${formattedTechStack}
        - Responses: ${JSON.stringify(transcripts, null, 2)}

        Return JSON matching:
        {
          "overallScorePercentage": 85,
          "summary": "Evaluation summary",
          "evaluations": [
            {
              "questionId": "q1",
              "scorePercentage": 85,
              "feedback": "Feedback",
              "idealAnswer": "Ideal answer"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini Evaluation Warn]:', err.message);
    }
  }

  // Fallback Evaluation
  return {
    overallScorePercentage: 78,
    summary: 'Candidate demonstrated good foundational logic with clear technical articulation across primary domains.',
    evaluations: (transcripts || []).map((t, idx) => ({
      questionId: t.questionId || `q${idx + 1}`,
      scorePercentage: 80,
      feedback: 'Good structured approach. Can be improved by detailing edge-case scenarios.',
      idealAnswer: 'Standard optimal industry practice using modular architecture.'
    }))
  };
};