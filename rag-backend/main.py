from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from chromadb.utils import embedding_functions
import os
from dotenv import load_dotenv
import httpx

# Load environment variables
load_dotenv()

# Check for DI API token
DEEPINFRA_API_TOKEN = os.getenv("DEEPINFRA_API_TOKEN")
if not DEEPINFRA_API_TOKEN:
    raise ValueError("DEEPINFRA_API_TOKEN not found in environment variables")

# Initialize FastAPI app
app = FastAPI(title="Cece's Portfolio RAG API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ChromaDB
client = chromadb.PersistentClient(path="./chroma_store")
embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)
collection = client.get_collection("cece-knowledge")

# Initialize HTTP client for Hugging Face
di_client = httpx.AsyncClient(timeout=30.0)  # 30 second timeout
DI_API_URL = "https://api.deepinfra.com/v1/inference/mistralai/Mistral-7B-Instruct-v0.3"


class Query(BaseModel):
    query: str

def create_prompt(query: str, context_chunks: list[str]) -> str:
    # Combine context chunks
    context = "\n\n".join(context_chunks)
    
    # Create Mistral instruction prompt
    prompt = f"""[INST] You are Cece's AI chatbot, CeceBot. You answer questions about Cece's life, skills, and projects. Using ONLY the following context, answer the question. Be friendly and casual in tone.
If you cannot answer the question based on the context, say "I don't have enough information to answer that question."

Context:
{context}

Question: {query}
[/INST]"""
    
    return prompt

async def query_mistral(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {DEEPINFRA_API_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        response = await di_client.post(
            DI_API_URL,
            headers=headers,
            json={
                "input": f"<s>{prompt} [/INST]",  # Mistral prefers [INST] format
                "stop": ["</s>"],
                "temperature": 0.7,
                "max_new_tokens": 500
            }
        )
        response.raise_for_status()
        result = response.json()

        # ✅ Parse correct field from DeepInfra
        return result["results"][0]["generated_text"].strip()

    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"DeepInfra API error: {str(e)}")


@app.post("/query")
async def query_endpoint(query: Query):
    try:
        # Get relevant chunks from ChromaDB
        results = collection.query(
            query_texts=[query.query],
            n_results=3
        )
        
        # Extract matched documents
        context_chunks = results['documents'][0]
        
        # Create prompt with context
        prompt = create_prompt(query.query, context_chunks)
        
        # Query Mistral model
        response = await query_mistral(prompt)
        
        return {
            "answer": response,
            "context_chunks": context_chunks
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("shutdown")
async def shutdown_event():
    await di_client.aclose()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
