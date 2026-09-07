"""
Application Configuration
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://proxyadmin:proxypass@localhost:5432/proxyplatform"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT Settings
    SECRET_KEY: str = "your-secret-key-change-in-production-min-32-chars-long"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # API Key Settings
    API_KEY_PREFIX: str = "pk_"
    
    # App Settings
    APP_NAME: str = "Proxy Platform"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
