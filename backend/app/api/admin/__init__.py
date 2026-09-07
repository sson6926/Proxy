"""
Admin API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from typing import List
from pydantic import BaseModel

from ..core.database import get_db
from ..models import User, APIKey
from ..api.auth import get_current_user

router = APIRouter()

# Pydantic models
class AdminStatsResponse(BaseModel):
    total_users: int
    total_api_keys: int
    active_api_keys: int
    total_proxies: int
    alive_proxies: int
    dead_proxies: int

class AdminUserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AdminUserUpdate(BaseModel):
    is_active: bool = None
    is_admin: bool = None

# Admin dependency
def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Verify current user is admin"""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

# Routes
@router.get("/stats", response_model=AdminStatsResponse)
def get_admin_stats(
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get system statistics (admin only)"""
    from ..models import Proxy
    
    total_users = db.query(User).count()
    total_api_keys = db.query(APIKey).count()
    active_api_keys = db.query(APIKey).filter(APIKey.is_active == True).count()
    
    # Proxy stats from data-plane database (need separate query)
    # For now, return placeholder
    total_proxies = 0
    alive_proxies = 0
    dead_proxies = 0
    
    return AdminStatsResponse(
        total_users=total_users,
        total_api_keys=total_api_keys,
        active_api_keys=active_api_keys,
        total_proxies=total_proxies,
        alive_proxies=alive_proxies,
        dead_proxies=dead_proxies
    )

@router.get("/users", response_model=List[AdminUserResponse])
def list_users(
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    """List all users (admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/users/{user_id}", response_model=AdminUserResponse)
def get_user(
    user_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get user by ID (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.patch("/users/{user_id}", response_model=AdminUserResponse)
def update_user(
    user_id: int,
    user_update: AdminUserUpdate,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.is_active is not None:
        user.is_active = user_update.is_active
    if user_update.is_admin is not None:
        user.is_admin = user_update.is_admin
    
    db.commit()
    db.refresh(user)
    return user

@router.get("/api-keys")
def list_all_api_keys(
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    """List all API keys (admin only)"""
    api_keys = db.query(APIKey).offset(skip).limit(limit).all()
    return [{
        "id": key.id,
        "name": key.name,
        "key": key.key[:20] + "...",  # Masked
        "is_active": key.is_active,
        "user_id": key.user_id,
        "created_at": key.created_at
    } for key in api_keys]

@router.get("/health")
def system_health_check(
    admin: User = Depends(get_current_admin_user)
):
    """Full system health check (admin only)"""
    import requests
    from datetime import datetime
    
    services = []
    
    # Check Control Plane
    try:
        services.append({
            "name": "Control Plane",
            "status": "healthy",
            "port": 8000
        })
    except:
        services.append({
            "name": "Control Plane",
            "status": "unhealthy",
            "port": 8000
        })
    
    # Check Data Plane
    try:
        resp = requests.get("http://data-plane:8001/", timeout=2)
        services.append({
            "name": "Data Plane",
            "status": "healthy" if resp.status_code == 200 else "unhealthy",
            "port": 8001
        })
    except:
        services.append({
            "name": "Data Plane",
            "status": "unreachable",
            "port": 8001
        })
    
    # Check PostgreSQL
    try:
        from ..core.database import engine
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        services.append({
            "name": "PostgreSQL",
            "status": "healthy",
            "port": 5432
        })
    except:
        services.append({
            "name": "PostgreSQL",
            "status": "unhealthy",
            "port": 5432
        })
    
    # Check Redis
    try:
        import redis
        r = redis.Redis(host='redis', port=6379, socket_connect_timeout=2)
        r.ping()
        services.append({
            "name": "Redis",
            "status": "healthy",
            "port": 6379
        })
    except:
        services.append({
            "name": "Redis",
            "status": "unhealthy",
            "port": 6379
        })
    
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "services": services
    }
