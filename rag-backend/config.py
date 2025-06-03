import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
DEEPINFRA_API_TOKEN = os.getenv("DEEPINFRA_API_TOKEN")
if not DEEPINFRA_API_TOKEN:
    raise ValueError("DEEPINFRA_API_TOKEN not found in environment variables")

DI_API_URL = "https://api.deepinfra.com/v1/inference/mistralai/Mistral-7B-Instruct-v0.3"

# Rate Limiting
RATE_LIMIT_WINDOW = 60  # 60 seconds window
RATE_LIMIT_MAX_REQUESTS = 10  # Maximum 10 requests per window

# Pinecone Configuration
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV", "us-east-1")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "cece-rag")
PINECONE_CLOUD = os.getenv("PINECONE_CLOUD", "aws")  # aws, gcp, or azure

# Model Configuration
EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# CORS
ALLOWED_ORIGINS = ["http://localhost:3000"]  # Next.js dev server 