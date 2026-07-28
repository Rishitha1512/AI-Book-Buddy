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
const ensurePayloadIndex = async () => {
  try {
    await client.createPayloadIndex("books", {
      field_name: "metadata.documentId",
      field_schema: "keyword",
    });
    console.log("Qdrant payload index ensured for metadata.documentId");
  } catch (err) {
    // If the index already exists, Qdrant will throw an error which we safely ignore
    if (!err.message?.includes("already exists")) {
      console.log("Payload index status:", err.message || "Index ready");
    }
  }
};

const getVectorStore = async () => {
  await ensurePayloadIndex();
  return await QdrantVectorStore.fromExistingCollection(embeddings, {
    client,
    collectionName: "books",
  });
};

module.exports = {
  embeddings,
  getVectorStore,
};