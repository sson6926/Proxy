from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..core.database import get_db
from ..core.security import decode_token
from ..core.exceptions import UnauthorizedException

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    """Get current authenticated user"""
    from ..modules.users.models import User
    
    token = credentials.credentials
    
    payload = decode_token(token)
    if payload is None:
        raise UnauthorizedException("Invalid token")
    
    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedException("Invalid token payload")
    
    # Fetch user from database
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    
    if not user:
        raise UnauthorizedException("User not found")
    
    if not user.is_active:
        raise UnauthorizedException("User is inactive")
    
    return user

async def get_current_admin_user(current_user = Depends(get_current_user)):
    """Get current admin user"""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user
