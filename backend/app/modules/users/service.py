from sqlalchemy.ext.asyncio import AsyncSession
from .repository import UserRepository
from .models import User
from .schemas import UserCreate, UserUpdate
from ...core.security import get_password_hash, verify_password
from ...core.exceptions import ConflictException, UnauthorizedException, NotFoundException

class UserService:
    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)
    
    async def create_user(self, user_data: UserCreate) -> User:
        # Check duplicates
        if await self.repo.get_by_username(user_data.username):
            raise ConflictException("Username already exists")
        if await self.repo.get_by_email(user_data.email):
            raise ConflictException("Email already exists")
        
        # Create user
        user = User(
            username=user_data.username,
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password),
            full_name=user_data.full_name
        )
        return await self.repo.create(user)
    
    async def authenticate(self, username: str, password: str) -> User:
        user = await self.repo.get_by_username(username)
        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedException("Invalid credentials")
        if not user.is_active:
            raise UnauthorizedException("User is inactive")
        return user
    
    async def get_user(self, user_id: int) -> User:
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise NotFoundException("User not found")
        return user
    
    async def update_user(self, user_id: int, user_data: UserUpdate) -> User:
        user = await self.get_user(user_id)
        
        if user_data.username and user_data.username != user.username:
            if await self.repo.get_by_username(user_data.username):
                raise ConflictException("Username already taken")
            user.username = user_data.username
        
        if user_data.email and user_data.email != user.email:
            if await self.repo.get_by_email(user_data.email):
                raise ConflictException("Email already taken")
            user.email = user_data.email
        
        if user_data.full_name is not None:
            user.full_name = user_data.full_name
        
        if user_data.password:
            user.hashed_password = get_password_hash(user_data.password)
        
        return await self.repo.update(user)
