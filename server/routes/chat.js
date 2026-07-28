const express = require("express");
const { askQuestion } = require("../services/rag");
const Chat = require("../models/Chat");

const router = express.Router();

router.get("/:documentId", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      documentId: req.params.documentId,
    });

    if (!chat) {
      return res.json({
        messages: [],
      });
    }

    res.json(chat);

  } catch(error) {
    console.error(error);

    res.status(500).json({
      error:"Failed to fetch chat",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { message, documentId } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }
    let chat = null;
    if (documentId) {
      chat = await Chat.findOne({ documentId });
      if (!chat) {
        chat = new Chat({ documentId, messages: [] });
      }

      // Save user question
      chat.messages.push({
        role: "user",
        content: message,
      });
    }

    const result = await askQuestion(message, documentId);

if (chat) {
  chat.messages.push({
    role: "assistant",
    content: result.answer,
    citations: result.citations,
  });

  await chat.save();
}

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Chat failed",
    });
  }
});

module.exports = router;