from sqlalchemy.orm import declarative_base

# Re-export the base class
from ..core.database import Base

__all__ = ["Base"]
