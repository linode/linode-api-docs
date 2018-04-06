FROM python:3

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY openapi-linter.py .
COPY openapi.yaml .
COPY style.css .
COPY build-docs.sh .

CMD ["python", "openapi-linter.py", "openapi.yaml"]
