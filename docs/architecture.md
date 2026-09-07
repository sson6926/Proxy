# Proxy Platform Architecture

## Overview
Microservices-based proxy pool platform with separated concerns.

## Components
- **Frontend**: React + Vite dashboard
- **Backend**: FastAPI control plane
- **Worker**: Proxy scraper, checker, scorer
- **Gateway**: Rotating proxy service (future)
- **Infra**: Docker Compose + Terraform

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS
- Backend: FastAPI, PostgreSQL, Redis
- Worker: Python async, Celery
- Infra: Docker, Nginx, Terraform
