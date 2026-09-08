from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ...db.base import Base

class Plan(Base):
    """Subscription plan model"""
    __tablename__ = "plans"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(Text)
    daily_quota = Column(Integer, default=1000)
    max_concurrent_requests = Column(Integer, default=10)
    price_monthly = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="plan")
