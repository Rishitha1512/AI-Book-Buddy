const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  pages: {
    type: Number,
    default: 0,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);