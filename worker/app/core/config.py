"""
Data Plane Configuration
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # PostgreSQL (for proxy metadata)
    DATABASE_URL: str = "postgresql://proxyadmin:proxypass@localhost:5432/proxyplatform"
    
    # Proxy checking
    CHECK_TIMEOUT: int = 10  # seconds
    CHECK_BATCH_SIZE: int = 100
    RECHECK_INTERVAL: int = 300  # 5 minutes
    
    # Scoring
    MIN_SCORE: int = 50
    MAX_SCORE: int = 100
    
    # Pools
    DEFAULT_POOL: str = "default"
    
    # API
    API_PORT: int = 8001
    
    # Worker
    WORKER_CONCURRENCY: int = 50
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
