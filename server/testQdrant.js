require("dotenv").config();

const { QdrantClient } = require("@qdrant/js-client-rest");

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

async function test() {
  try {
    const collections = await client.getCollections();
    console.log("✅ Connected!");
    console.log(collections);
  } catch (err) {
    console.error(err);
  }
}

test();