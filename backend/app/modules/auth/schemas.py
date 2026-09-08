from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: int
    username: str
    is_admin: bool = False
