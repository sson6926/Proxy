"""
Worker Main Entry Point
Handles proxy scraping, checking, and scoring
"""
from .jobs.worker import main

if __name__ == "__main__":
    main()
