import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('CRITICAL ERROR: Gemini API key is missing in process.env');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper function: Exponential Backoff Retry on 503 high-demand errors
const generateWithRetry = async (modelName, prompt, generationConfig, retries = 3, delay = 1000) => {
  const model = genAI.getGenerativeModel({ model: modelName, generationConfig });
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      const is503 = error.status === 503 || error.message?.includes('503');
      if (is503 && attempt < retries) {
        console.warn(`[Gemini 503] Server busy. Retrying in ${delay}ms... (Attempt ${attempt}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
};

export const generateInterviewQuestions = async ({
  targetRole,
  targetCompany,
  experienceLevel,
  currentRole,
  techStack
}) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || '');

  const prompt = `
    Act as a senior technical interviewer at ${targetCompany || 'a top tech company'}.
    Generate exactly 5 relevant interview questions for a candidate with:
    - Target Role: ${targetRole}
    - Experience Level: ${experienceLevel}
    - Tech Stack: ${formattedTechStack}

    Return ONLY a valid JSON array of 5 objects matching this schema:
    [
      {
        "questionId": "q1",
        "questionText": "Your generated question here",
        "category": "Technical"
      }
    ]
  `;

  try {
    const result = await generateWithRetry('gemini-1.5-flash', prompt, { responseMimeType: 'application/json' });
    const rawText = result.response.text().trim();
    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Primary model failed, falling back to gemini-1.5-pro:", err.message);
    const fallbackResult = await generateWithRetry('gemini-1.5-pro', prompt, { responseMimeType: 'application/json' });
    const rawText = fallbackResult.response.text().trim();
    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  }
};

export const evaluateInterview = async ({ targetRole, experienceLevel, techStack, transcripts }) => {
  const formattedTechStack = Array.isArray(techStack) ? techStack.join(', ') : (techStack || '');

  const prompt = `
    You are an expert technical interviewer evaluating a candidate for:
    - Role: ${targetRole}
    - Level: ${experienceLevel}
    - Tech Stack: ${formattedTechStack}

    Here are the interview questions and candidate's transcribed audio answers:
    ${JSON.stringify(transcripts, null, 2)}

    Evaluate every question and response rigorously. Return ONLY a valid JSON object matching this exact schema:
    {
      "overallScorePercentage": 82,
      "summary": "Provide a comprehensive overall summary performance review here.",
      "evaluations": [
        {
          "questionId": "q1",
          "scorePercentage": 85,
          "feedback": "Detailed evaluation feedback for this specific answer.",
          "idealAnswer": "Key conceptual solution or ideal answer."
        }
      ]
    }
  `;

  try {
    const result = await generateWithRetry('gemini-1.5-flash', prompt, { responseMimeType: 'application/json' });
    const rawText = result.response.text().trim();
    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Primary model evaluation failed, falling back to gemini-1.5-pro:", err.message);
    const fallbackResult = await generateWithRetry('gemini-1.5-pro', prompt, { responseMimeType: 'application/json' });
    const rawText = fallbackResult.response.text().trim();
    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  }
};