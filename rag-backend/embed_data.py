import json
import chromadb
from sentence_transformers import SentenceTransformer
from chromadb.utils import embedding_functions

def main():
    # Load the data
    print("Loading data from data.json...")
    with open("data.json", "r") as f:
        data = json.load(f)
    
    # Extract texts and ids
    texts = [item["text"] for item in data]
    ids = [item["id"] for item in data]
    
    # Initialize ChromaDB client
    print("Initializing ChromaDB...")
    client = chromadb.PersistentClient(path="./chroma_store")
    
    # Create or get collection with sentence-transformer embeddings
    embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    
    # Delete collection if it exists (for clean state)
    try:
        client.delete_collection("cece-knowledge")
    except:
        pass
    
    # Create new collection
    collection = client.create_collection(
        name="cece-knowledge",
        embedding_function=embedding_fn
    )
    
    # Add documents to collection
    print(f"Adding {len(texts)} documents to ChromaDB...")
    collection.add(
        documents=texts,
        ids=ids
    )
    
    print("Done! Embeddings are stored in ./chroma_store")

if __name__ == "__main__":
    main()
