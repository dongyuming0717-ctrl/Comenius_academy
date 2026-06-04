"""
TMUA 向量检索 — BGE-small 混合检索 (向量 + 关键词)
"""
import os
import re
from functools import lru_cache

import chromadb
from chromadb.utils import embedding_functions

CHROMA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "chroma_db")

# Lazy: chromadb ONNX 模型 79MB, 在国内下载极慢, 只在真正需要搜索时才初始化
_default_embed_fn = None


def _get_default_embed_fn():
    global _default_embed_fn
    if _default_embed_fn is None:
        _default_embed_fn = embedding_functions.DefaultEmbeddingFunction()
    return _default_embed_fn


@lru_cache(maxsize=1)
def _get_bge_embed_fn():
    """懒加载 BGE-small, 下载失败则回退到 default"""
    try:
        from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
        bge = SentenceTransformerEmbeddingFunction(model_name="BAAI/bge-small-en-v1.5")
        bge(["test"])
        return bge
    except Exception:
        return None


def _get_embed_fn():
    bge = _get_bge_embed_fn()
    if bge is not None:
        return bge
    return _get_default_embed_fn()


class TMURetriever:
    def __init__(self):
        os.makedirs(CHROMA_DIR, exist_ok=True)
        self.chroma = chromadb.PersistentClient(path=CHROMA_DIR)
        embed_fn = _get_embed_fn()
        coll_name = "tmua_bge" if _get_bge_embed_fn() is not None else "tmua_solutions"
        self.collection = self.chroma.get_or_create_collection(
            coll_name, embedding_function=embed_fn
        )
        self._embed_fn = embed_fn

    def search(self, query: str, k: int = 3) -> list[dict]:
        """混合检索: 向量相似度 + 关键词加权"""
        count = self.collection.count()
        if count == 0:
            return []
        # 检索更多候选, 再混合排序
        n = min(k * 3, count)
        results = self.collection.query(query_texts=[query], n_results=n)
        if not results["documents"][0]:
            return []

        items = []
        for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
            items.append({"text": doc, "metadata": meta})

        # 关键词加权: TMUA 专有名词命中 +2
        scored = []
        query_lower = query.lower()
        math_kw = ["differentiate", "integrate", "stationary", "tangent", "normal",
                    "sin", "cos", "tan", "log", "vector", "probability", "sequence",
                    "series", "binomial", "quadratic", "polynomial", "factor", "circle"]
        for i, item in enumerate(items):
            text_lower = item["text"].lower()
            score = n - i  # 向量排名分 (高排名=高分)
            for kw in math_kw:
                if kw in query_lower and kw in text_lower:
                    score += 2
            scored.append((score, item))

        scored.sort(key=lambda x: -x[0])
        return [item for _, item in scored[:k]]

    def add_solution(self, text: str, metadata: dict):
        qid = f"{metadata.get('year','?')}_{metadata.get('paper','?')}_{metadata.get('question_no','?')}"
        existing = self.collection.get(ids=[qid])
        if existing["ids"]:
            self.collection.delete(ids=[qid])
        self.collection.add(documents=[text], metadatas=[metadata], ids=[qid])

    def stats(self) -> dict:
        count = self.collection.count()
        topics = {}
        if count > 0:
            for meta in self.collection.get()["metadatas"]:
                t = meta.get("topic", "unknown")
                topics[t] = topics.get(t, 0) + 1
        return {"total": count, "by_topic": topics, "embedding": type(self._embed_fn).__name__}
