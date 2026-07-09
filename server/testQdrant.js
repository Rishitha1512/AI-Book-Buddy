require("dotenv").config();

const { getVectorStore } = require("./config/qdrant");

(async () => {
  try {
    const store = await getVectorStore();
    console.log("Qdrant connected");
  } catch (err) {
    console.error("Connection failed", err);
  }
})();