import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logging():
    """Setup application logging"""
    
    # Create logs directory
    os.makedirs("logs", exist_ok=True)
    
    # Root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.DEBUG)
    
    # File handler
    fh = RotatingFileHandler(
        "logs/app.log",
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    fh.setLevel(logging.DEBUG)
    
    # Console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)
    
    # Add handlers
    root_logger.addHandler(fh)
    root_logger.addHandler(ch)
    
    return root_logger

logger = setup_logging()
