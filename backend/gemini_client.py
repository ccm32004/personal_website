import math

from google import genai
from google.genai import types

import config

client = genai.Client(api_key=config.GEMINI_API_KEY)

# Documents and queries must be embedded with different task types for
# retrieval to work well, but with the same model and dimensionality.
DOCUMENT = "RETRIEVAL_DOCUMENT"
QUERY = "RETRIEVAL_QUERY"


def _embed_config(task_type: str) -> types.EmbedContentConfig:
    return types.EmbedContentConfig(
        task_type=task_type,
        output_dimensionality=config.EMBEDDING_DIMENSION,
    )


def _normalize(values: list[float]) -> list[float]:
    # gemini-embedding-001 only returns normalized vectors at its default 3072
    # dimensions. Truncated output has to be unit-scaled by hand or Pinecone's
    # cosine metric ranks by magnitude instead of direction.
    norm = math.sqrt(sum(v * v for v in values))
    return [v / norm for v in values]


def embed(text: str, task_type: str) -> list[float]:
    response = client.models.embed_content(
        model=config.EMBEDDING_MODEL,
        contents=text,
        config=_embed_config(task_type),
    )
    return _normalize(response.embeddings[0].values)


async def embed_async(text: str, task_type: str) -> list[float]:
    response = await client.aio.models.embed_content(
        model=config.EMBEDDING_MODEL,
        contents=text,
        config=_embed_config(task_type),
    )
    return _normalize(response.embeddings[0].values)


async def generate_async(prompt: str) -> str:
    response = await client.aio.models.generate_content(
        model=config.CHAT_MODEL,
        contents=prompt,
    )
    return (response.text or "").strip()
