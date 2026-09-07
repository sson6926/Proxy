"""
Proxy Platform - Control Plane Main Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, api_keys, plans, admin, workers, proxy_health, audit_logs, usage_stats
from app.core.database import engine, Base
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Proxy Platform - Control Plane",
    description="Manage users, plans, API keys, and quotas",
    version="0.1.0-mvp"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(api_keys.router, prefix="/api/keys", tags=["api-keys"])
app.include_router(plans.router, prefix="/api/plans", tags=["plans"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(workers.router, tags=["workers"])
app.include_router(proxy_health.router, tags=["proxy-health"])
app.include_router(usage_stats.router, tags=["usage-stats"])
app.include_router(audit_logs.router, tags=["audit-logs"])


@app.get("/")
async def root():
    return {
        "service": "Proxy Platform Control Plane",
        "status": "running",
        "version": "0.1.0-mvp"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
