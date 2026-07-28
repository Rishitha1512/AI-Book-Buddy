const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

// 1. Get ALL documents for a specific user
router.get("/user/:clerkUserId", async (req, res) => {
  try {
    const documents = await Document.find({
      clerkUserId: req.params.clerkUserId,
    }).sort({
      uploadedAt: -1,
    });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch documents",
    });
  }
});

// 2. Get ONE single document by document ID
router.get("/:documentId", async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId);

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;