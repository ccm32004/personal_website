Here’s your updated, **granular and testable MVP task list**, based on your full architecture and process. Each task is atomic and can be handed to an engineering LLM (or tackled individually) for step-by-step execution and verification.

---

# ✅ RAG Chatbot MVP — Granular Engineering Task List

This task list walks through building a local-first RAG-powered chatbot for a portfolio site. You will manually prepare data, embed it locally using MiniLM, store it in ChromaDB, retrieve relevant chunks via FastAPI, query a Hugging Face LLM, and connect the backend to a chat UI in your Next.js + Tailwind app.

---

## 📁 SETUP (Initial Project Structure)

### 1. Create `rag-backend/` directory

- Confirm the structure:

  ```
  my-portfolio/
  ├── rag-backend/
  │   ├── main.py
  │   ├── embed_data.py
  │   ├── data.json
  │   ├── chroma_store/
  │   └── requirements.txt
  ```

### 2. Add `requirements.txt`

```txt
fastapi
uvicorn
chromadb
sentence-transformers
httpx
python-dotenv
```

---

## 🧠 DATA PREP + EMBEDDING

### 3. Manually create `data.json` in `rag-backend/`

- Write clean, structured text chunks about yourself.
- Format:

```json
[
  {
    "id": "bio-1",
    "text": "Cece is a Computer Science CO-OP student at the University of Ottawa..."
  },
  {
    "id": "project-melodymatch",
    "text": "Cece created MelodyMatch..."
  }
]
```

### 4. Implement `embed_data.py`

- Load `data.json`
- Embed with `all-MiniLM-L6-v2`
- Save embeddings to local ChromaDB collection (`cece-knowledge`)
- Persist to `chroma_store/`

### 5. Run and test `embed_data.py`

- ✅ Verify ChromaDB has the correct number of vectors.
- ✅ Confirm `chroma_store/` is created and populated.

---

## 🌐 BACKEND RETRIEVAL + LLM CALL

### 6. Create `main.py` (FastAPI app)

- Expose `POST /query`
- Accepts: `{ "query": "..." }`
- Embeds the query with MiniLM
- Queries local ChromaDB for top 3 matching chunks
- Constructs `[INST]`-style prompt

### 7. Send prompt to Hugging Face Inference API

- Use `mistralai/Mistral-7B-Instruct-v0.1`
- Use `HF_API_TOKEN` from `.env.local`
- Return the generated response

### 8. Test `/query` endpoint

- Run with `uvicorn main:app --reload`
- Test with `curl` or Postman
- ✅ Ensure it returns a useful answer

---

## 🖥️ FRONTEND CHAT COMPONENT (NEXT.JS)

### 9. Create `src/components/Chat.tsx`

- UI includes:

  - Textarea for input
  - Submit button
  - Display area for response

- POST query to `http://localhost:8000/query`

### 10. Add `<Chat />` to `src/app/page.tsx`

- Integrate it as a new **section** below existing content
- Wrap it in a `<section>` styled using the Cyberpunk Tailwind theme

### 11. Style the chat section

- Use colors, shadows, and fonts from your custom Tailwind config
- Ensure it:

  - Fits visually into the site
  - Does not take up the full screen
  - Looks like an interactive “terminal” or retro AI panel

---

## 🧪 LOCAL VALIDATION

### 12. Manually test chatbot end-to-end

- Ask: "What is MelodyMatch?" or "Where did Cece work?"
- ✅ Ensure answer comes from your written data
- ✅ Validate loading state and UI behavior

---

## 🚀 (OPTIONAL) DEPLOY BACKEND

### 13. Deploy `rag-backend/` to Render or Fly.io (later)

- Add `chroma_store/` as persistent volume if needed
- Set `HF_API_TOKEN` in environment
- Change frontend URL from `localhost:8000` to live endpoint

---

## 🔐 ENVIRONMENT SETUP

### 14. Add `.env.local` in `rag-backend/`

```bash
HF_API_TOKEN=your_huggingface_token
```

---

## 🧩 BONUS TASKS (OPTIONAL)

- [ ] Add loading animation / typewriter effect in chat
- [ ] Add fallback if no chunks retrieved
- [ ] Switch to Chroma Cloud later (just update the client)
- [ ] Log unanswered queries for improvement

---

## ✅ MVP DONE WHEN

- [ ] Data is embedded and stored locally
- [ ] Query returns grounded response from Hugging Face
- [ ] Chat UI is styled and integrated into the site
- [ ] Working locally end-to-end
- [ ] Ready for Vercel + backend deployment

---

Let me know if you'd like this as a downloadable `.md` file or want any task expanded into implementation code.
