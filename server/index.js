require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/mongo");

// Connect to MongoDB
connectMongo();

const uploadRoute = require("./routes/upload");
const chatRoute = require("./routes/chat");
const documentsRoute = require("./routes/documents");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/documents", documentsRoute);

// Existing route
app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});