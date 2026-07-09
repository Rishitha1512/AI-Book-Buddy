require("dotenv").config();

const { generateAnswer } = require("./config/gemini");

(async () => {
  try {
    const result = await generateAnswer(
      "The sky is blue.",
      "What color is the sky?"
    );
    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();