const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const chatModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateAnswer = async (context, question) => {
  const prompt = `
Answer ONLY using the context below.

Context:
${context}

Question:
${question}
`;

  const result = await chatModel.generateContent(prompt);
  return result.response.text();
};

module.exports = {
  generateAnswer,
};