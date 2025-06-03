import json
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
import config

def main():
    # Load the data
    print("Loading data from data.json...")
    with open("data.json", "r") as f:
        data = json.load(f)

    # Extract texts and ids
    texts = [item["text"] for item in data]
    ids = [item["id"] for item in data]

    # Initialize embedding model
    print("Initializing embedding model...")
    model = SentenceTransformer(config.EMBEDDING_MODEL)

    # Initialize Pinecone v3 client
    print("Initializing Pinecone client...")
    pc = Pinecone(api_key=config.PINECONE_API_KEY)

    # Create index if it doesn't exist
    index_name = config.PINECONE_INDEX_NAME
    if index_name not in pc.list_indexes().names():
        print(f"Creating new index: {index_name}")
        pc.create_index(
            name=index_name,
            dimension=768,
            metric="cosine",
            spec=ServerlessSpec(
                cloud=config.PINECONE_CLOUD,    # "aws" or "gcp"
                region=config.PINECONE_ENV      # e.g., "us-east-1"
            )
        )

    # Connect to the index
    index = pc.Index(index_name)

    # Clear existing vectors (optional)
    print("Clearing existing vectors...")
    index.delete(delete_all=True)

    # Prepare and embed vectors
    print("Embedding documents...")
    vectors = []
    for item in data:
        vector = model.encode(item["text"]).tolist()
        vectors.append({
            "id": item["id"],
            "values": vector,
            "metadata": {"text": item["text"]}
        })

    # Upsert to Pinecone in batches
    print(f"Upserting {len(vectors)} vectors to Pinecone...")
    batch_size = 100
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i + batch_size]
        index.upsert(vectors=batch)  # ✅ v3 requires this structure

    print("✅ Done! Embeddings are stored in Pinecone.")

if __name__ == "__main__":
    main()
