from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pinecone import Pinecone, ServerlessSpec
from rate_limiter import RateLimiter
import gemini_client
import config
import os

# Initialize FastAPI app
app = FastAPI(title="Cece's Portfolio RAG API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize rate limiter
rate_limiter = RateLimiter(
    window=config.RATE_LIMIT_WINDOW,
    max_requests=config.RATE_LIMIT_MAX_REQUESTS
)

# Initialize Pinecone client (v3)
print("Initializing Pinecone...")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = os.getenv("PINECONE_INDEX_NAME")
region = os.getenv("PINECONE_ENV")

# Connect to index (do not create index to save memory)
if index_name not in pc.list_indexes().names():
    raise RuntimeError(f"Pinecone index '{index_name}' not found. Please create it manually.")

index = pc.Index(index_name)

class Query(BaseModel):
    query: str

def create_prompt(query: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    return f"""
You are CeceBot, Cece's AI portfolio chatbot. You answer questions about Cece's life, skills, experience, and projects using ONLY the provided context.

Your tone should be polished, confident, and lightly yassified:
- Be clear, concise, and informative first.
- Add a small touch of personality or flair, but do not overdo it.
- Do not call the user "darling", "queen", "bestie", or similar names.
- Avoid excessive praise, hype, or dramatic language.
- Avoid phrases like "absolute icon", "fabulous creation", "engineering excellence", or "slay" unless they genuinely fit naturally.
- Emojis are optional and should be used sparingly, at most one per response.
- Prefer 2–4 sentences for simple questions.
- Use bullet points when answering questions about multiple projects, skills, or experiences.
- Do not repeat the same yassified phrases across responses.
- Keep the tone professional enough for recruiters and hiring managers.

If the context does not contain enough information to answer the question, respond exactly with:

"I don't have enough information to answer that question. ✨"

Context:
{context}

Question: {query}"""

@app.get("/")
async def health():
    return {"status": "ok"}

@app.post("/query")
async def query_endpoint(query: Query, request: Request):
    rate_limiter.check(request.client.host)

    try:
        query_embedding = await gemini_client.embed_async(query.query, gemini_client.QUERY)

        query_response = index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )

        context_chunks = [match["metadata"]["text"] for match in query_response["matches"]]

        prompt = create_prompt(query.query, context_chunks)
        response = await gemini_client.generate_async(prompt)

        return {
            "answer": response,
            "context_chunks": context_chunks
        }

    except Exception as e:
        print("❌ ERROR in /query:", str(e))  # <- Add this log
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
