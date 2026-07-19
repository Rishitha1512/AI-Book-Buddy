# BookBuddy

An AI-powered PDF assistant that allows users to upload documents and have intelligent conversations with them.

Built using **Retrieval-Augmented Generation (RAG)**, BookBuddy combines semantic search with **Google Gemini** to provide accurate, context-aware answers from uploaded PDFs.

---

# Overview

BookBuddy transforms static PDF documents into interactive knowledge sources.

The application follows a **Retrieval-Augmented Generation (RAG) pipeline**:

```
User uploads PDF
        ↓
PDF content extraction
        ↓
Text splitting into chunks
        ↓
Generate vector embeddings
        ↓
Store embeddings in Qdrant Vector Database
        ↓
Retrieve relevant document context
        ↓
Google Gemini generates AI response
```

---

# Features

- Upload and process PDF documents
- Chat with uploaded documents using AI
- Semantic search using vector embeddings
- Context-aware responses using RAG
- Retrieve answers from relevant document sections
- Source citations with page numbers and line references
- Secure user authentication with Clerk
- Fast AI responses powered by Google Gemini

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk Authentication

---

## Backend

- Node.js
- Express.js
- LangChain
- Multer

---

## AI & Database

- Google Gemini API
- Gemini Embeddings
- Qdrant Cloud Vector Database

---

## Deployment

- Frontend: Vercel
- Backend: Render

---

# Installation & Setup

## Prerequisites

Make sure you have:

- Node.js >= 18
- npm
- Google Gemini API Key
- Qdrant Cloud Account
- Clerk Account

---

# 1. Clone Repository

```bash
git clone https://github.com/Rishitha1512/AI-Book-Buddy.git
```

---

# 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

GOOGLE_API_KEY=your_gemini_api_key

QDRANT_URL=your_qdrant_url

QDRANT_API_KEY=your_qdrant_api_key
```

Start the backend server:

```bash
npm run dev
```

---

# 3. Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

CLERK_SECRET_KEY=your_clerk_secret
```

Start the frontend:

```bash
npm run dev
```

---

The application will run at:

```
http://localhost:3000
```

---

# API Endpoints

## Upload PDF

### Endpoint

```
POST /upload
```
Uploads and processes a PDF document.

## Chat With Document

### Endpoint

```
POST /chat
```
Ask questions about the uploaded document.


![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)