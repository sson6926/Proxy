from pydantic import BaseModel
from typing import Optional, List

class ProxyRequest(BaseModel):
    protocol: Optional[str] = None
    country: Optional[str] = None
    limit: int = 10

class ProxyResponse(BaseModel):
    ip: str
    port: int
    protocol: str
    country: Optional[str] = None
    anonymity_level: Optional[str] = None

class ProxyListResponse(BaseModel):
    proxies: List[ProxyResponse]
    total: int
