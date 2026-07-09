// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // 🔹 Chat model (for answering)
// const chatModel = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });


// // 🔹 Answer generator
// const generateAnswer = async (context, question) => {
//   const prompt = `
// You are an AI assistant.
// Answer the question using ONLY the provided book content.
// If the answer is not present, say "The book does not contain this information.

// Context:
// ${context}

// Question:
// ${question}
// `;

//   const result = await chatModel.generateContent(prompt);
//   return result.response.text();
// };

// module.exports = {
//   generateAnswer
// };
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 🔹 Chat model (for answering)
const chatModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 🔹 Answer generator
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