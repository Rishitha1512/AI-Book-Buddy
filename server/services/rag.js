const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { CharacterTextSplitter } = require("@langchain/textsplitters");
const { getVectorStore } = require("../config/qdrant");
const { generateAnswer } = require("../config/gemini");

// Function to load a PDF
const loadPDF = async (filePath) => {
  // Create loader
  const loader = new PDFLoader(filePath);

  // Read the PDF
  const docs = await loader.load();

  return docs;
};

const splitDocuments = async (docs) => {
  const splitter = new CharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitDocuments(docs);

  return chunks;
};

const storeChunks = async (chunks) => {
  const vectorStore = await getVectorStore();

  await vectorStore.addDocuments(chunks);

  return chunks.length;
};

const retrieveChunks = async (question) => {
  // Connect to Qdrant
  const vectorStore = await getVectorStore();

  // Create a retriever
  const retriever = vectorStore.asRetriever({
    k: 2,
  });

  // Search for relevant chunks
  const docs = await retriever.invoke(question);

  return docs;
};

const askQuestion = async (question) => {
  // 1. Retrieve relevant chunks
  const docs = await retrieveChunks(question);

  // 2. Combine all retrieved text
  const context = docs
    .map((doc) => doc.pageContent)
    .join("\n\n");

  // 3. Ask Gemini
  const answer = await generateAnswer(context, question);

  return {
    answer,
    sources: docs,
  };
};

module.exports = {
  loadPDF,
  splitDocuments,
  storeChunks,
  retrieveChunks,
  askQuestion,
};