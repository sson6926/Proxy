import hashlib
import secrets
import string

def generate_api_key() -> str:
    """Generate random API key (64 chars hex)"""
    random_bytes = secrets.token_bytes(32)
    return hashlib.sha256(random_bytes).hexdigest()

def generate_random_string(length: int = 16) -> str:
    """Generate random alphanumeric string"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def hash_string(value: str) -> str:
    """Hash a string using SHA256"""
    return hashlib.sha256(value.encode()).hexdigest()
