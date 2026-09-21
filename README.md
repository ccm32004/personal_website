# cecema.dev

Personal site + CeceBot. Two apps: a Next.js frontend and a FastAPI RAG backend.

## Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, Google Gemini (embeddings + chat), Pinecone
- **Hosting:** Netlify (`frontend/`), Render (`backend/`)

CeceBot reads from Pinecone. Chat content lives in `backend/data.json`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

The chat UI calls `NEXT_PUBLIC_BACKEND_URL` (defaults to `http://localhost:8000`). For a production frontend build, set that env var to the Render URL before `npm run build`.

## Backend

Needs a `backend/.env`:

```env
GEMINI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENV=us-east-1
PINECONE_INDEX_NAME=cece-rag-768
```

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at [http://localhost:8000](http://localhost:8000).

- `GET /` — health check (`{"status":"ok"}`)
- `POST /query` — `{ "query": "..." }`

After editing `data.json`, re-embed into Pinecone:

```bash
cd backend
source .venv/bin/activate
python embed_data.py
```
