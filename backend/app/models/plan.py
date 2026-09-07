"""
Database Models - Plan & Subscription
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class Plan(Base):
    __tablename__ = "plans"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)  # free, basic, pro, enterprise
    display_name = Column(String, nullable=False)
    description = Column(String)
    
    # Quotas
    requests_per_day = Column(Integer, default=1000)
    requests_per_minute = Column(Integer, default=60)
    max_concurrent = Column(Integer, default=10)
    
    # Features
    allowed_countries = Column(JSON, default=list)  # ["VN", "US", "SG", "*"]
    allowed_protocols = Column(JSON, default=list)  # ["http", "https", "socks5"]
    sticky_session_enabled = Column(Boolean, default=False)
    min_score = Column(Integer, default=50)  # Minimum proxy score
    
    # Pricing (cents per month)
    price_monthly = Column(Integer, default=0)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    subscriptions = relationship("Subscription", back_populates="plan")
    
    def __repr__(self):
        return f"<Plan(id={self.id}, name={self.name})>"


class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan_id = Column(Integer, ForeignKey("plans.id"), nullable=False)
    
    status = Column(String, default="active")  # active, cancelled, expired
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))
    cancelled_at = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User")
    plan = relationship("Plan", back_populates="subscriptions")
    
    def __repr__(self):
        return f"<Subscription(id={self.id}, user_id={self.user_id}, plan_id={self.plan_id})>"
