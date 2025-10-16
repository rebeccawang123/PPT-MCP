FROM python:3.9-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENV PORT=9000
CMD ["python", "-m", "ppt_mcp"]   # ① 确保项目有 __main__.py；否则改成 python app.py
