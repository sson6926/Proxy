from sqlalchemy.ext.asyncio import AsyncSession
from ..users.service import UserService
from ..users.schemas import UserCreate
from ...core.security import create_access_token, create_refresh_token
from .schemas import TokenResponse

class AuthService:
    def __init__(self, db: AsyncSession):
        self.user_service = UserService(db)
    
    async def register(self, user_data: UserCreate):
        """Register new user"""
        return await self.user_service.create_user(user_data)
    
    async def login(self, username: str, password: str) -> TokenResponse:
        """Login and return tokens"""
        user = await self.user_service.authenticate(username, password)
        
        # Create tokens
        access_token = create_access_token(
            data={"sub": str(user.id), "username": user.username, "is_admin": user.is_admin}
        )
        refresh_token = create_refresh_token(
            data={"sub": str(user.id)}
        )
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token
        )
