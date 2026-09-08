from pydantic import BaseModel, Field
from typing import Generic, TypeVar, List

T = TypeVar("T")

class PaginationParams(BaseModel):
    """Pagination parameters"""
    skip: int = Field(0, ge=0, description="Number of items to skip")
    limit: int = Field(10, ge=1, le=100, description="Number of items to return")

class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response wrapper"""
    total: int
    skip: int
    limit: int
    items: List[T]
