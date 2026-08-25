# Docker Guide for PlugFit Frontend

This document explains how to build and run the PlugFit frontend using Docker.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+) — optional, for easier management

---

## Quick Start (Docker Compose)

The fastest way to get started:

```bash
# Navigate to the frontend directory
cd frontend

# Build and start the container
docker compose up --build

# Access the app at http://localhost:3000
```

To stop the container:

```bash
docker compose down
```

---

## Manual Build & Run (Docker)

### 1. Build the Docker Image

```bash
cd frontend

docker build -t plugfit-frontend .
```

### 2. Run the Container

```bash
docker run -d \
  --name plugfit-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_URL=http://localhost:8067 \
  plugfit-frontend
```

### 3. Access the App

Open your browser and go to:
```
http://localhost:3000
```

### 4. Stop & Remove the Container

```bash
docker stop plugfit-frontend
docker rm plugfit-frontend
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API server URL | `http://localhost:8067` |
| `NODE_ENV` | Environment mode | `production` |

### Passing Environment Variables

**Option 1: Using a `.env` file**

Create a `.env` file in the `frontend/` directory:

```bash
cp .env.example .env
# Edit .env with your values
```

Then run:

```bash
docker compose up --build
```

**Option 2: Command line**

```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com \
  plugfit-frontend
```

---

## Development Mode

If you want to run the app in development mode (with hot-reload):

```bash
cd frontend

docker run -d \
  --name plugfit-dev \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -e NODE_ENV=development \
  -e NEXT_PUBLIC_BACKEND_URL=http://host.docker.internal:8067 \
  plugfit-frontend \
  npm run dev
```

> **Note:** When using `host.docker.internal`, the backend must be running on your host machine and listening on all interfaces (0.0.0.0), not just localhost.

---

## Viewing Logs

```bash
# Docker Compose
docker compose logs -f

# Docker run
docker logs -f plugfit-frontend
```

---

## Rebuilding After Changes

```bash
# Docker Compose
docker compose up --build --force-recreate

# Docker run
docker build -t plugfit-frontend .
docker stop plugfit-frontend && docker rm plugfit-frontend
docker run -d --name plugfit-frontend -p 3000:3000 plugfit-frontend
```

---

## Troubleshooting

### Container exits immediately

Check logs for errors:
```bash
docker logs plugfit-frontend
```

### Port already in use

Use a different port:
```bash
docker run -d -p 3001:3000 plugfit-frontend
```

Then access at `http://localhost:3001`.

### Backend connection refused

The frontend tries to connect to the backend via the proxy at `/api/proxy/*`. Make sure:
1. Your backend is running and accessible
2. `NEXT_PUBLIC_BACKEND_URL` is set correctly
3. If running backend on host, use `http://host.docker.internal:8067` instead of `localhost`

### Clean slate

Remove all containers and images:
```bash
docker compose down --rmi all
# or
docker rm -f plugfit-frontend
docker rmi plugfit-frontend
```
