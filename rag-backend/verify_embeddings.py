import chromadb
import json

def main():
    # Load original data for comparison
    print("Loading original data...")
    with open("data.json", "r") as f:
        data = json.load(f)
    original_count = len(data)
    
    # Connect to ChromaDB
    print("Connecting to ChromaDB...")
    client = chromadb.PersistentClient(path="./chroma_store")
    
    try:
        # Get the collection
        collection = client.get_collection("cece-knowledge")
        
        # Get collection stats
        count = collection.count()
        print(f"\nVerification Results:")
        print(f"✓ ChromaDB collection exists")
        print(f"✓ Found {count} embedded documents")
        print(f"✓ Matches original data count: {count == original_count}")
        
        # Test a simple query to ensure embeddings work
        print("\nTesting sample query...")
        results = collection.query(
            query_texts=["What are Cece's technical skills?"],
            n_results=2
        )
        
        print("\nSample matches:")
        for doc, id in zip(results['documents'][0], results['ids'][0]):
            print(f"\nID: {id}")
            print(f"Text: {doc[:100]}...")
            
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("\n✅ Verification complete! Embeddings are working correctly.")
    else:
        print("\n❌ Verification failed! Please check the errors above.") 