FROM python:3.12-slim

RUN apt-get update && \
  apt-get install -y netcat-traditional && \
  rm -rf /var/lib/apt/lists/*


RUN pip install poetry

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && \
  poetry install --no-dev --no-interaction

COPY . .

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]