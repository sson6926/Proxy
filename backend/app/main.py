from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.logging import logger
from .modules.auth.router import router as auth_router
from .modules.users.router import router as users_router
from .modules.plans.router import router as plans_router
from .modules.api_keys.router import router as api_keys_router
from .modules.proxies.router import router as proxies_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(plans_router, prefix="/api")
app.include_router(api_keys_router, prefix="/api")
app.include_router(proxies_router, prefix="/api")

@app.on_event("startup")
async def startup():
    """Startup event"""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")

@app.on_event("shutdown")
async def shutdown():
    """Shutdown event"""
    from .core.redis import close_redis
    await close_redis()
    logger.info("Application shutdown")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
