import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ye current folder aur server folder dono ke .env ko dhoondh lega
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Dynamic API Key Sanitizer (Trims spaces and strips accidental surrounding quotes)
const getSanitizedApiKey = () => {
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || '';
  return rawKey.trim().replace(/^["']|["']$/g, '');
};

const getGenAIClient = () => {
  const apiKey = getSanitizedApiKey();
  if (!apiKey) {
    console.error('❌ [Gemini Auth Error]: No valid Gemini API key found in environment variables.');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

// Safe JSON Extraction (Handles markdown code blocks and raw JSON structures)
const extractCleanJSON = (rawText) => {
  try {
    return JSON.parse(rawText);
  } catch (initialErr) {
    const jsonMatch = rawText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error(`JSON extraction failed: ${initialErr.message}`);
  }
};

// Heuristic Anti-Cheat & Transcript Sanity Checker
const auditTranscriptQuality = (questionText = '', answerText = '') => {
  const cleanQ = questionText.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  const cleanA = (answerText || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  const words = cleanA.split(/\s+/).filter(Boolean);

  // 1. Empty or virtually empty response
  if (words.length < 4) {
    return {
      isInvalid: true,
      score: 0,
      feedback: 'No substantive response recorded (less than 4 words). Expected a detailed technical answer.'
    };
  }

  // 2. Direct copy-paste / Echoing the question
  if (cleanA === cleanQ || cleanQ.includes(cleanA) || (cleanA.length > 25 && cleanQ.indexOf(cleanA.slice(0, 25)) !== -1)) {
    return {
      isInvalid: true,
      score: 0,
      feedback: 'Severe Anti-Pattern: Candidate copied or echoed the interview question rather than answering it.'
    };
  }

  // 3. Keyword parroting check
  const qWordSet = new Set(cleanQ.split(/\s+/).filter(w => w.length > 3));
  const substantiveAnswerWords = words.filter(w => w.length > 3);
  if (qWordSet.size > 0 && substantiveAnswerWords.length > 0) {
    const matchingWords = substantiveAnswerWords.filter(w => qWordSet.has(w)).length;
    const parrotRatio = matchingWords / substantiveAnswerWords.length;
    if (parrotRatio > 0.85 && substantiveAnswerWords.length <= qWordSet.size + 2) {
      return {
        isInvalid: true,
        score: 0,
        feedback: 'Anti-Pattern Detected: Response merely rearranged question keywords without providing a technical solution.'
      };
    }
  }

  return { isInvalid: false };
};

// 1. Generate Interview Questions
export const generateInterviewQuestions = async ({
  targetRole,
  targetCompany,
  experienceLevel,
  currentRole,
  techStack
}) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || 'Software Engineering');
  const genAI = getGenAIClient();

  if (genAI) {
    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { 
            responseMimeType: 'application/json',
            temperature: 0.7 
          }
        });

        const prompt = `
You are an expert technical interviewer at ${targetCompany || 'Tier-1 Tech Companies'}.
Generate exactly 5 targeted, highly relevant interview questions for:
- Target Role: ${targetRole}
- Experience Level: ${experienceLevel}
- Core Tech Stack: ${formattedTechStack}
- Candidate Background: ${currentRole || 'Not specified'}

Requirements:
1. Questions must specifically test hands-on architectural, algorithmic, and debugging challenges in ${formattedTechStack}.
2. Categorize them strictly into: 'Technical', 'System Design', 'Behavioral / STAR', 'Problem Solving', or 'Security'.
3. Do not ask generic or trivial questions.

Return ONLY a JSON array matching this exact schema:
[
  {
    "questionId": "q1",
    "questionText": "Detailed question prompt",
    "category": "Technical"
  }
]
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = extractCleanJSON(text);

        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed.map((item, idx) => ({
            questionId: item.questionId || `q${idx + 1}`,
            questionText: item.questionText,
            category: item.category || 'Technical'
          }));
        }
      } catch (err) {
        console.error(`🔥 [Gemini Error on ${modelName} - Question Generation]:`, err.message);
      }
    }
  }

  // Realistic Fallback Generator (Tailored to the user's role and stack)
  console.warn('⚡ Using dynamic fallback question compilation');
  const stackList = Array.isArray(techStack) ? techStack : [techStack];
  const primary = stackList[0] || 'Core Architecture';
  const secondary = stackList[1] || 'Distributed Systems';

  return [
    {
      questionId: 'q1',
      questionText: `Explain how state hydration, lifecycle management, and rendering pipelines are optimized in production ${primary}.`,
      category: 'Technical'
    },
    {
      questionId: 'q2',
      questionText: `Walk me through how you design an idempotent API endpoint or webhook receiver that handles duplicate deliveries safely.`,
      category: 'System Design'
    },
    {
      questionId: 'q3',
      questionText: `Describe a scenario where you diagnosed an asynchronous race condition or memory leak when integrating ${secondary}.`,
      category: 'Problem Solving'
    },
    {
      questionId: 'q4',
      questionText: `How do you handle JWT refresh token rotation, CORS pre-flight constraints, and secure header configurations in a full-stack architecture?`,
      category: 'Security'
    },
    {
      questionId: 'q5',
      questionText: `Tell me about a tight technical deadline where you made deliberate engineering trade-offs under high pressure. Apply the STAR method.`,
      category: 'Behavioral / STAR'
    }
  ];
};

// 2. Evaluate Interview Answers with Strict Anti-Cheat
export const evaluateInterview = async ({ targetRole, experienceLevel, techStack, transcripts = [] }) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || 'Engineering');
  
  // Step 1: Pre-Audit each answer before AI evaluation
  const preAuditedEvaluations = [];
  const validForAiTranscripts = [];

  for (const item of transcripts) {
    const audit = auditTranscriptQuality(item.questionText, item.userAnswerText);
    if (audit.isInvalid) {
      preAuditedEvaluations.push({
        questionId: item.questionId,
        scorePercentage: audit.score,
        feedback: audit.feedback,
        idealAnswer: 'Candidate must provide a structured answer explaining the problem context, execution steps, and quantifiable results.'
      });
    } else {
      validForAiTranscripts.push(item);
    }
  }

  // If candidate cheated/echoed on ALL questions, reject immediately with 0
  if (validForAiTranscripts.length === 0) {
    return {
      overallScorePercentage: 0,
      overallScore: 0,
      summary: 'Evaluation Rejected: Candidate provided zero substantive answers, echoed questions, or entered invalid transcripts.',
      feedback: 'Every response submitted was either empty, under the minimum required threshold, or a duplicate of the question.',
      evaluations: preAuditedEvaluations,
      strengths: [],
      improvements: [
        'Answer the actual technical question instead of copying the prompt.',
        'Apply the STAR framework: Situation, Task, Action, Result.',
        'Include measurable metrics and specific API/architectural trade-offs.'
      ]
    };
  }

  const genAI = getGenAIClient();

  if (genAI) {
    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { 
            responseMimeType: 'application/json',
            temperature: 0.2 // Low temperature for deterministic, strict scoring
          }
        });

        const prompt = `
You are a senior hiring committee evaluator at a top-tier technology company.
Strictly audit this technical mock interview:
- Target Role: ${targetRole} (${experienceLevel})
- Calibrated Tech Stack: ${formattedTechStack}
- Candidate Submissions:
${JSON.stringify(validForAiTranscripts, null, 2)}

Strict Grading Rules:
1. ZERO TOLERANCE FOR FLUFF: If the candidate gives vague, hand-waving explanations without technical depth, award less than 35 points.
2. STAR COMPLIANCE: Rate whether behavioral answers cover Situation, Task, Action, Result.
3. SCORING SCALE:
   - 80-100: Exceptional, production-ready depth with exact syntax/trade-offs.
   - 50-79: Basic understanding, missing edge cases or optimizations.
   - 0-49: Incomplete, incorrect, off-topic, or trivial answers.
4. Calculate 'overallScorePercentage' strictly as the mathematical average of all question scores.

Return ONLY a valid JSON object matching this schema:
{
  "overallScorePercentage": 75,
  "summary": "Concise executive evaluation of the candidate's performance",
  "evaluations": [
    {
      "questionId": "q1",
      "scorePercentage": 75,
      "feedback": "Specific critique detailing technical flaws and strong points",
      "idealAnswer": "Exemplary model answer showing how a Staff Engineer would structure the response using STAR"
    }
  ],
  "strengths": ["List of 2-3 genuine engineering strengths verified in the response"],
  "improvements": ["List of 2-3 specific anti-patterns or gaps identified"]
}
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = extractCleanJSON(text);

        if (parsed && Array.isArray(parsed.evaluations)) {
          // Merge pre-audited failures with AI evaluations
          const combinedEvaluations = [...parsed.evaluations, ...preAuditedEvaluations];
          
          // Re-calculate true mathematical average across all questions
          const totalScore = combinedEvaluations.reduce((sum, item) => sum + (Number(item.scorePercentage) || 0), 0);
          const finalAverage = Math.round(totalScore / combinedEvaluations.length);

          return {
            overallScorePercentage: finalAverage,
            overallScore: finalAverage,
            summary: finalAverage < 40 ? 'Performance flagged: Significant gaps in technical depth and articulation.' : parsed.summary,
            feedback: parsed.summary,
            evaluations: combinedEvaluations,
            strengths: finalAverage < 40 ? [] : (parsed.strengths || []),
            improvements: parsed.improvements || ['Improve technical terminology and quantification of engineering impact.']
          };
        }
      } catch (err) {
        console.error(`🔥 [Gemini Error on ${modelName} - Evaluation]:`, err.message);
      }
    }
  }

  // Realistic Fallback (No free passes: grades based on real word length & anti-cheat)
  console.warn('⚡ Using heuristic fallback evaluation');
  const fallbackEvaluations = transcripts.map((t, idx) => {
    const audit = auditTranscriptQuality(t.questionText, t.userAnswerText);
    if (audit.isInvalid) {
      return {
        questionId: t.questionId || `q${idx + 1}`,
        scorePercentage: 0,
        feedback: audit.feedback,
        idealAnswer: 'Provide a structured, concrete solution with domain trade-offs.'
      };
    }

    const wordCount = (t.userAnswerText || '').trim().split(/\s+/).length;
    const calcScore = wordCount < 20 ? 30 : wordCount < 50 ? 55 : 70;

    return {
      questionId: t.questionId || `q${idx + 1}`,
      scorePercentage: calcScore,
      feedback: calcScore < 50 ? 'Answer lacks architectural depth and measurable outcomes.' : 'Solid foundational response. Detail edge cases for a higher score.',
      idealAnswer: 'A high-impact response applying the STAR framework with concrete system metrics.'
    };
  });

  const avg = Math.round(fallbackEvaluations.reduce((acc, curr) => acc + curr.scorePercentage, 0) / (fallbackEvaluations.length || 1));

  return {
    overallScorePercentage: avg,
    overallScore: avg,
    summary: avg < 50 ? 'Candidate struggled to articulate comprehensive technical solutions.' : 'Acceptable foundational responses with areas for architectural improvement.',
    feedback: 'Evaluated via fallback heuristics due to gateway latency.',
    evaluations: fallbackEvaluations,
    strengths: avg >= 60 ? ['Clear verbal baseline'] : [],
    improvements: ['Include quantifiable metrics', 'Avoid copying question prompts', 'Explain failure scenarios']
  };
};