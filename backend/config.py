import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Rate Limiting
RATE_LIMIT_WINDOW = 60  # 60 seconds window
RATE_LIMIT_MAX_REQUESTS = 10  # Maximum 10 requests per window

# Pinecone Configuration
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV", "us-east-1")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "cece-rag-768")
PINECONE_CLOUD = os.getenv("PINECONE_CLOUD", "aws")  

# Model Configuration
EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIMENSION = 768
CHAT_MODEL = "gemini-3.5-flash-lite"

# CORS
ALLOWED_ORIGINS = [
    "http://localhost:3000",           
    "https://cecema.tech",             
    "https://www.cecema.tech",
    "http://cecema.tech", 
]
