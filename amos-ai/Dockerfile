# Amos AI — ECS 低内存优化
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1

# 阿里云镜像加速 (ECS 国内访问 PyPI 超时)
RUN sed -i 's|ports.ubuntu.com|mirrors.aliyun.com|g' /etc/apt/sources.list.d/ubuntu.sources && \
    apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple/ && \
    pip3 install --no-cache-dir --break-system-packages \
    flask==3.1.* gunicorn==23.* openai>=1.0.0 \
    chromadb>=0.5.0 pymupdf>=1.23.0

# 预下载 ONNX embedding 模型 (避免容器内下载超时)
RUN mkdir -p /root/.cache/chroma/onnx_models/all-MiniLM-L6-v2
COPY data/onnx_cache/onnx.tar.gz /root/.cache/chroma/onnx_models/all-MiniLM-L6-v2/

WORKDIR /app
COPY agent/ ./agent/
COPY past-paper-library/ ./past-paper-library/

EXPOSE 8080
CMD ["gunicorn", "-w", "1", "--timeout", "120", "--bind", "0.0.0.0:8080", \
     "--chdir", "/app/past-paper-library", "app:app"]
