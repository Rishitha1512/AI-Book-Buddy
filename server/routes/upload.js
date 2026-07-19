const express = require("express");
const multer = require("multer");
const { loadPDF, splitDocuments, storeChunks } = require("../services/rag");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

const docs = await loadPDF(req.file.path);

const chunks = await splitDocuments(docs);

await storeChunks(chunks);

console.log("Pages:", docs.length);
console.log("Chunks:", chunks.length);
console.log("Stored in Qdrant!");

res.json({
  message: "PDF processed successfully",
  pages: docs.length,
  chunks: chunks.length,
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;