---
## 🧠 BACKEND DEPLOYMENT (RAG + FastAPI + Pinecone + DeepInfra)
---

### 1. ✅ Update `render.yaml` for Pinecone

```yaml
services:
  - type: web
    name: cece-rag-backend
    runtime: python
    buildCommand: 'pip install -r requirements.txt'
    startCommand: 'uvicorn main:app --host 0.0.0.0 --port 8000'
    envVars:
      - key: DEEPINFRA_API_TOKEN
        sync: false
      - key: PINECONE_API_KEY
        sync: false
      - key: PINECONE_ENV
        sync: false
      - key: PINECONE_INDEX_NAME
        sync: false
    plan: free
```

📍**Test**: File saved and includes Pinecone variables.

---

### 2. ✅ Replace ChromaDB with Pinecone in backend logic

> Use `pinecone.init()` and `pinecone.Index(...)` in your RAG pipeline (see full code in Step 4).

📍**Test**: No more references to `chromadb`.

---

### 2.5 ✅ Update `requirements.txt`

```txt
fastapi
uvicorn
pinecone-client
sentence-transformers
httpx
python-dotenv
```

📍**Test**: Run `pip install -r requirements.txt` locally without error.

---

### 3. ✅ Add `.env` file locally

```env
DEEPINFRA_API_TOKEN=your_deepinfra_token
PINECONE_API_KEY=your_pinecone_token
PINECONE_ENV=us-east1-gcp
PINECONE_INDEX_NAME=cece-rag
```

📍**Test**: `os.getenv(...)` works in code.

---

### 4. ✅ Update vector storage code to use Pinecone

```python
import os
import pinecone
from fastapi import FastAPI
from sentence_transformers import SentenceTransformer

app = FastAPI()

pinecone.init(
    api_key=os.getenv("PINECONE_API_KEY"),
    environment=os.getenv("PINECONE_ENV")
)
index_name = os.getenv("PINECONE_INDEX_NAME")
if index_name not in pinecone.list_indexes():
    pinecone.create_index(name=index_name, dimension=768)
index = pinecone.Index(index_name)
```

📍**Test**: You can `.upsert()` and `.query()` vectors successfully.

---

### 5. ✅ Push backend to GitHub

```bash
git add .
git commit -m "Switch to Pinecone Cloud + update requirements"
git push origin main
```

📍**Test**: Repo contains all updates.

---

### 6. ✅ Add Render environment variables

- `DEEPINFRA_API_TOKEN`
- `PINECONE_API_KEY`
- `PINECONE_ENV`
- `PINECONE_INDEX_NAME`

📍**Test**: Render service starts cleanly.

---

### 7. ✅ Test your Render backend endpoint

```bash
curl -X POST https://cece-rag-backend.onrender.com/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is MelodyMatch?"}'
```

📍**Expected**: Valid, relevant response from Pinecone-powered RAG.

---

## 💻 FRONTEND DEPLOYMENT (Next.js + Tailwind + Vercel)

_(No changes from original plan)_

---

Let me know if you'd like a **helper script** for loading and embedding your docs into Pinecone — happy to make your dev loop faster.

---

## 💻 FRONTEND DEPLOYMENT (Next.js + Tailwind + Vercel)

### 8. ✅ Replace backend URL in `Chat.tsx`

```ts
const response = await fetch('https://cece-rag-backend.onrender.com/query', {
```

📍**Test**: Frontend queries backend correctly

---

### 9. ✅ Push frontend to GitHub (if not already)

```bash
git add .
git commit -m "Prepare frontend for Vercel"
git push origin main
```

📍**Test**: Frontend repo up to date

---

### 10. ✅ Log in to [Vercel](https://vercel.com), import repo

📍**Test**: No build errors

---

### 11. ✅ Set `NEXT_PUBLIC_BACKEND_URL` env var in Vercel

(e.g. `https://cece-rag-backend.onrender.com`)

📍**Test**: Chat frontend works with backend

---

### ✅ You're done!
