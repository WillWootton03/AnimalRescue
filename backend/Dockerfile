FROM python:3.14

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY main.py .

CMD ["sh", "-c", "alembic upgrade head && fastapi dev main.py --host 0.0.0.0 --port 3000"]