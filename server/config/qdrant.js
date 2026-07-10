const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const { QdrantClient } = require("@qdrant/js-client-rest");

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  checkCompatibility: false,
});

const getVectorStore = async () => {
  return await QdrantVectorStore.fromExistingCollection(embeddings, {
    client,
    collectionName: "books",
  });
};

module.exports = {
  embeddings,
  getVectorStore,
};