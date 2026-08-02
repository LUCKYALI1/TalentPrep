import api from "./api"; // Aapka Axios instance

export const scheduleInterviewApi = async (formData) => {
  // Ensure Array for techStack
  const parsedTechStack = Array.isArray(formData.techStack) && formData.techStack.length > 0
    ? formData.techStack
    : typeof formData.techStack === "string"
      ? formData.techStack.split(",").map(item => item.trim())
      : ["React", "Node.js", "MongoDB"];

  // Pure Instant Payload
  const payload = {
    userId: formData.userId,
    jobRole: formData.jobRole || "MERN Full-Stack Developer",
    companyTier: formData.companyTier || "Tier 2 (High-Growth Startups)",
    experienceYears: Number(formData.experienceYears || formData.experience || 2),
    techStack: parsedTechStack,
    isInstant: true // Date/Time parameters hata diye gaye hain
  };

  console.log("[ADVANCED FLOW PAYLOAD]:", payload);

  const response = await api.post("/interviews/schedule", payload);
  return response.data; 
};