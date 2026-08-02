import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateQuestionsFromAI = async (role, techStack, yearOfExperience) => {
  try {
    // 🚨 Standard initialization using @google/generative-ai
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-3.6-flash",}); // ✅ updated (gemini-1.5-flash retired)

    const experienceText = yearOfExperience
      ? `${yearOfExperience} years of experience`
      : 'Entry Level / Junior';

    const prompt = `You are a senior technical interviewer conducting a live coding/technical session.
Target Candidate Profile:
- Role: ${role}
- Tech Stack: ${Array.isArray(techStack) ? techStack.join(', ') : techStack}
- Experience Level: ${experienceText}

Task:
Generate exactly 10 technical interview questions tailored precisely to this candidate's experience level.
- If Experience < 2 years: Focus on core fundamentals, syntax, and basic problem-solving.
- If Experience 2-5 years: Focus on real-world implementation, state management, and edge cases.
- If Experience > 5 years: Focus on high-level architecture, system design, and scalability.

CRITICAL INSTRUCTION: Return ONLY a valid JSON array of strings. Do NOT include markdown blocks (\`\`\`json). Do NOT add conversational text like "Here are the questions". Just the array.
Example:
["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"]`;

    // 🔥 Sending request using the stable method
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    console.log("[GEMINI RAW OUTPUT]:", rawText); // Debugging log

    // Bulletproof JSON Extraction (Aapka original logic intact hai)
    const arrayMatch = rawText.match(/\[[\s\S]*\]/);

    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    } else {
      rawText = rawText.replace(/```json|```/g, '').trim();
      return JSON.parse(rawText);
    }

  } catch (error) {
    console.error("❌ [GEMINI API CRASHED! REASON]:", error.message);

    // User-friendly fallback array
    return [
      "⚠️ AI Tokens Exhausted / Server is busy.",
      "⏳ Please wait a few minutes while we restore the connection.",
      "In the meantime, could you tell us more about your recent projects?",
      "We are working on bringing the AI back online...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "..."
    ];
  }
};

/**
 * Candidate ke Answers aur YoE ke aadhar par evaluation karega
 */
export const evaluateInterviewFromAI = async (role, yearOfExperience, qaPairs) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are a senior technical interviewer evaluating a candidate's responses.
Target Profile: Role: ${role}, Experience: ${yearOfExperience || 'Entry Level'} years

Candidate Q&A Responses:
${JSON.stringify(qaPairs, null, 2)}

Task:
Evaluate each answer fairly based on their experience level.
1. Calculate overall accuracy percentage (0-100%).
2. Provide feedback for each answer.
3. Provide an ideal/standard technical answer for each question where they scored lower.

Respond strictly in valid JSON format ONLY:
{
  "overallScorePercentage": 85,
  "summary": "Overall candidate demonstrated solid practical knowledge...",
  "evaluations": [
    {
      "questionId": 1,
      "scorePercentage": 90,
      "feedback": "Clear answer with practical examples.",
      "idealAnswer": "An ideal answer should cover..."
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    
    // 🔥 BULLETPROOF JSON PARSING
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      rawText = rawText.replace(/```json|```/g, '').trim();
      return JSON.parse(rawText);
    }
  } catch (error) {
    console.error("[GEMINI EVALUATION ERROR]:", error.message);
    throw error;
  }
};