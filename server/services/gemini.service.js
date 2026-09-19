// server/services/gemini.service.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key Reader
const getGeminiClient = () => {
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';
  const cleanKey = rawKey.trim().replace(/^["']|["']$/g, '');
  if (!cleanKey) {
    console.error('❌ [Gemini Error]: GEMINI_API_KEY not found in environment');
    return null;
  }
  return new GoogleGenerativeAI(cleanKey);
};

// Safe JSON Extractor
const extractJSON = (rawText) => {
  if (!rawText) throw new Error('Empty text received from model');
  const clean = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(clean);
  } catch (err) {
    const match = clean.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) return JSON.parse(match[0]);
    throw err;
  }
};

// Anti-Cheat & Copy-Paste Inspector
const auditAnswer = (questionText = '', answerText = '') => {
  const qClean = questionText.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  const aClean = (answerText || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  const words = aClean.split(/\s+/).filter(Boolean);

  if (words.length < 4) {
    return {
      invalid: true,
      score: 0,
      feedback: 'Zero Marks: Insufficient answer (less than 4 words provided).'
    };
  }

  if (aClean === qClean || qClean.includes(aClean) || (aClean.length > 20 && qClean.indexOf(aClean.slice(0, 20)) !== -1)) {
    return {
      invalid: true,
      score: 0,
      feedback: 'Zero Marks: Question was echoed or copy-pasted instead of answering.'
    };
  }

  return { invalid: false };
};

// ⚡ Google recommended active model list
const ACTIVE_MODELS = ['gemini-3.6-flash', 'gemini-2.5-flash'];

// 1. Generate Interview Questions
export const generateInterviewQuestions = async ({
  targetRole,
  targetCompany,
  experienceLevel,
  techStack
}) => {
  const formattedStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || 'Engineering');
  const genAI = getGeminiClient();

  if (genAI) {
    for (const modelName of ACTIVE_MODELS) {
      try {
        console.log(`🤖 Generating questions with ${modelName}...`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        });

        const prompt = `
You are a Staff Technical Interviewer for ${targetRole} (${experienceLevel}) at ${targetCompany || 'Top Tech'}.
Tech Stack: ${formattedStack}

Generate exactly 5 distinct, high-impact technical interview questions testing real-world architectural trade-offs, debugging, and system flow in ${formattedStack}.

Return ONLY a JSON array matching:
[
  {
    "questionId": "q1",
    "questionText": "Question text here",
    "category": "Technical"
  }
]
        `;

        const result = await model.generateContent(prompt);
        const parsed = extractJSON(result.response.text());
        if (Array.isArray(parsed) && parsed.length >= 3) {
          console.log(`✅ Questions generated successfully via ${modelName}`);
          return parsed.map((q, idx) => ({
            questionId: q.questionId || `q${idx + 1}`,
            questionText: q.questionText,
            category: q.category || 'Technical'
          }));
        }
      } catch (err) {
        console.error(`🔥 [Gemini Error on ${modelName} - Question Generation]:`, err.message);
      }
    }
  }

  // Backup fallback
  console.warn('⚡ Using dynamic fallback questions');
  const stack = Array.isArray(techStack) ? techStack : [techStack || 'Web Technologies'];
  return [
    {
      questionId: 'q1',
      questionText: `Explain internal memory management, lifecycle stages, and rendering optimizations in ${stack[0]}.`,
      category: 'Technical'
    },
    {
      questionId: 'q2',
      questionText: `How would you architect a resilient, idempotent service for ${targetRole} to prevent duplicate transactions?`,
      category: 'System Design'
    },
    {
      questionId: 'q3',
      questionText: `Walk me through a production race condition or latency issue you diagnosed. What specific metrics did you analyze?`,
      category: 'Problem Solving'
    },
    {
      questionId: 'q4',
      questionText: `How do you implement JWT rotation, CORS boundaries, and secure HTTP-only configurations in production?`,
      category: 'Security'
    },
    {
      questionId: 'q5',
      questionText: `Describe a scenario where you negotiated technical debt under high-pressure delivery timelines. Apply STAR.`,
      category: 'Behavioral / STAR'
    }
  ];
};

// 2. Evaluate Interview Answers
export const evaluateInterview = async ({ targetRole, experienceLevel, techStack, transcripts = [] }) => {
  const formattedStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || 'Engineering');
  
  const cheatedEvals = [];
  const validTranscripts = [];

  for (const item of transcripts) {
    const audit = auditAnswer(item.questionText, item.userAnswerText);
    if (audit.invalid) {
      cheatedEvals.push({
        questionId: item.questionId,
        scorePercentage: 0,
        feedback: audit.feedback,
        idealAnswer: 'Candidate must provide a concrete answer following the STAR framework.'
      });
    } else {
      validTranscripts.push(item);
    }
  }

  if (validTranscripts.length === 0) {
    return {
      overallScorePercentage: 0,
      overallScore: 0,
      summary: 'Evaluation Rejected: All submissions were flagged as empty or copied prompts.',
      feedback: 'Every response submitted was either under 4 words or a duplicate of the question.',
      evaluations: cheatedEvals,
      strengths: [],
      improvements: [
        'Do not copy the interview prompt.',
        'Use the STAR structure (Situation, Task, Action, Result).',
        'State exact architectural trade-offs and code solutions.'
      ]
    };
  }

  const genAI = getGeminiClient();

  if (genAI) {
    for (const modelName of ACTIVE_MODELS) {
      try {
        console.log(`🤖 Evaluating answers with ${modelName}...`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        });

        const prompt = `
You are an expert technical evaluator reviewing a candidate for ${targetRole} (${experienceLevel}).
Tech Stack: ${formattedStack}

Candidate Responses:
${JSON.stringify(validTranscripts, null, 2)}

Scoring Guidelines:
1. Strict grading: Vague or hand-waving explanations must score below 40%.
2. Score based on technical depth, trade-offs, and STAR structure.

Return ONLY a JSON object:
{
  "summary": "Executive summary of strengths and weaknesses",
  "evaluations": [
    {
      "questionId": "q1",
      "scorePercentage": 75,
      "feedback": "Critique detailing exact flaws and positives",
      "idealAnswer": "Exemplary Staff-level answer using STAR"
    }
  ],
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1", "Improvement 2"]
}
        `;

        const result = await model.generateContent(prompt);
        const parsed = extractJSON(result.response.text());

        if (parsed && Array.isArray(parsed.evaluations)) {
          const combined = [...parsed.evaluations, ...cheatedEvals];
          const total = combined.reduce((acc, curr) => acc + (Number(curr.scorePercentage) || 0), 0);
          const average = Math.round(total / combined.length);

          return {
            overallScorePercentage: average,
            overallScore: average,
            summary: average < 40 ? 'Significant technical gaps identified.' : parsed.summary,
            feedback: parsed.summary,
            evaluations: combined,
            strengths: average < 40 ? [] : (parsed.strengths || []),
            improvements: parsed.improvements || ['Improve technical depth and metrics.']
          };
        }
      } catch (err) {
        console.error(`🔥 [Gemini Evaluation Error on ${modelName}]:`, err.message);
      }
    }
  }

  // Fallback if AI unreachable
  const fallbackEvals = transcripts.map((t) => {
    const audit = auditAnswer(t.questionText, t.userAnswerText);
    if (audit.invalid) {
      return {
        questionId: t.questionId,
        scorePercentage: 0,
        feedback: audit.feedback,
        idealAnswer: 'Provide a structured solution detailing system trade-offs.'
      };
    }
    const words = (t.userAnswerText || '').trim().split(/\s+/).length;
    const score = words < 15 ? 20 : words < 40 ? 45 : 65;
    return {
      questionId: t.questionId,
      scorePercentage: score,
      feedback: score < 40 ? 'Answer lacks sufficient depth.' : 'Good baseline. Add edge cases.',
      idealAnswer: 'Detailed STAR answer mentioning failure modes.'
    };
  });

  const avg = Math.round(fallbackEvals.reduce((a, b) => a + b.scorePercentage, 0) / (fallbackEvals.length || 1));

  return {
    overallScorePercentage: avg,
    overallScore: avg,
    summary: avg < 40 ? 'Candidate struggled to articulate technical solutions.' : 'Acceptable foundational responses.',
    feedback: 'Evaluated via strict heuristics.',
    evaluations: fallbackEvals,
    strengths: avg >= 60 ? ['Acceptable communication baseline'] : [],
    improvements: ['Do not copy question prompts', 'Detail technical trade-offs']
  };
};