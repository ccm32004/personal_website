from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pinecone import Pinecone, ServerlessSpec
import httpx
from rate_limiter import RateLimiter
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

# Async HTTP client
di_client = httpx.AsyncClient(timeout=30.0)

class Query(BaseModel):
    query: str

def create_prompt(query: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    return f"""[INST] You are Cece's AI chatbot, CeceBot. You answer questions about Cece's life, skills, and projects. Using ONLY the following context, answer the question.

Respond in a formal yet fabulously yassified manner — polished, articulate, but with a hint of glam. If you do not have enough information to answer based on the context, say:

"I don't have enough information to answer that question. ✨"

Maintain clarity, poise, and a confident tone. Remember: we're serving facts with a touch of flair. 💅📚"

Context:
{context}

Question: {query}
[/INST]"""

async def get_embedding_from_deepinfra(text: str) -> list[float]:
    headers = {
        "Authorization": f"Bearer {config.DEEPINFRA_API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "input": text,
        "model": "sentence-transformers/all-MiniLM-L6-v2",
        "encoding_format": "float"
    }

    response = await di_client.post(
        "https://api.deepinfra.com/v1/openai/embeddings",
        headers=headers,
        json=data
    )
    response.raise_for_status()
    return response.json()["data"][0]["embedding"]

async def query_mistral(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {config.DEEPINFRA_API_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        response = await di_client.post(
            config.DI_API_URL,
            headers=headers,
            json={
                "input": f"<s>{prompt} [/INST]",
                "stop": ["</s>"],
                "temperature": 0.7,
                "max_new_tokens": 500
            }
        )
        response.raise_for_status()
        return response.json()["results"][0]["generated_text"].strip()

    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"DeepInfra API error: {str(e)}")

@app.post("/query")
async def query_endpoint(query: Query, request: Request):
    rate_limiter.check(request.client.host)

    try:
        query_embedding = await get_embedding_from_deepinfra(query.query)

        query_response = index.query(
            vector=query_embedding,
            top_k=3,
            include_metadata=True
        )

        context_chunks = [match["metadata"]["text"] for match in query_response["matches"]]

        prompt = create_prompt(query.query, context_chunks)
        response = await query_mistral(prompt)

        return {
            "answer": response,
            "context_chunks": context_chunks
        }

    except Exception as e:
        print("❌ ERROR in /query:", str(e))  # <- Add this log
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("shutdown")
async def shutdown_event():
    await di_client.aclose()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
