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

const storeChunks = async (chunks, documentId) => {
  const vectorStore = await getVectorStore();

  // Attach documentId to each chunk's metadata
  const chunksWithMetadata = chunks.map((chunk) => {
    chunk.metadata = {
      ...chunk.metadata,
      documentId: documentId.toString(),
    };
    return chunk;
  });

  await vectorStore.addDocuments(chunksWithMetadata);

  return chunks.length;
};

const retrieveChunks = async (question, documentId) => {
  const vectorStore = await getVectorStore();

  // Filter Qdrant search strictly to this documentId
  const retriever = vectorStore.asRetriever({
    k: 2,
    filter: documentId
      ? {
          must: [
            {
              key: "metadata.documentId",
              match: { value: documentId.toString() },
            },
          ],
        }
      : undefined,
  });

  const docs = await retriever.invoke(question);

  return docs;
};

const askQuestion = async (question, documentId) => {
  // 1. Retrieve relevant chunks for THIS specific document
  const docs = await retrieveChunks(question, documentId);

  // 2. Combine all retrieved text
  const context = docs
    .map((doc) => doc.pageContent)
    .join("\n\n");

  // 3. Ask Gemini
  const answer = await generateAnswer(context, question);
  // 4. Build citations from retrieved chunks
const citations = docs.map((doc) => {
  const page = doc.metadata?.loc?.pageNumber ?? 1;

  // First 150 characters of the retrieved chunk
  const preview =
    doc.pageContent.length > 150
      ? doc.pageContent.slice(0, 150) + "..."
      : doc.pageContent;

  return {
    page,
    preview,
  };
});

  return {
    answer,
    citations,
  };
};

module.exports = {
  loadPDF,
  splitDocuments,
  storeChunks,
  retrieveChunks,
  askQuestion,
};