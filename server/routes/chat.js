const express = require("express");
const { askQuestion } = require("../services/rag");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const result = await askQuestion(message);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Chat failed",
    });
  }
});

module.exports = router;