from sqlalchemy.ext.asyncio import AsyncSession
from ..core.database import Base, engine

async def init_db():
    """Initialize database - create all tables"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_session() -> AsyncSession:
    """Get database session for manual use"""
    from ..core.database import AsyncSessionLocal
    async with AsyncSessionLocal() as session:
        yield session
