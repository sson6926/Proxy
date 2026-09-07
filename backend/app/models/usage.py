"""
Database Models - Usage Tracking
"""
from sqlalchemy import Column, Integer, BigInteger, Date, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from ..core.database import Base


class Usage(Base):
    __tablename__ = "usage"
    __table_args__ = (
        UniqueConstraint('user_id', 'date', name='unique_user_date'),
    )
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False, server_default=func.current_date())
    
    request_count = Column(Integer, default=0)
    success_count = Column(Integer, default=0)
    failure_count = Column(Integer, default=0)
    traffic_bytes = Column(BigInteger, default=0)
    
    def __repr__(self):
        return f"<Usage(id={self.id}, user_id={self.user_id}, date={self.date}, requests={self.request_count})>"
