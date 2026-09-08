# Proxy Platform API Documentation

## Base URL
```
Development: http://localhost:8000/api/v1
Production: https://api.proxyplatform.com/api/v1
```

## Authentication
All API requests require Bearer token authentication:
```
Authorization: Bearer <your-api-key>
```

---

## Authentication Endpoints

### POST /auth/login
Login and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user"
  }
}
```

### POST /auth/register
Register new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

### POST /auth/logout
Logout current user (invalidates token).

---

## Proxy Endpoints

### GET /proxies
Retrieve list of available proxies.

**Query Parameters:**
- `protocol` (string): Filter by protocol (http, https, socks5)
- `country` (string): Filter by country code (US, UK, DE, etc.)
- `limit` (number): Number of proxies to return (default: 10, max: 100)

**Response:**
```json
{
  "proxies": [
    {
      "id": "prx_123",
      "ip": "192.168.1.100",
      "port": 8080,
      "protocol": "http",
      "country": "US",
      "status": "active",
      "responseTime": 245
    }
  ],
  "total": 150
}
```

### GET /proxies/random
Get a random proxy from the pool.

**Query Parameters:**
- `protocol` (string): Optional protocol filter
- `country` (string): Optional country filter

**Response:**
```json
{
  "proxy": {
    "id": "prx_456",
    "ip": "10.0.0.50",
    "port": 3128,
    "protocol": "https",
    "country": "UK",
    "status": "active"
  }
}
```

### POST /proxies/:id/check
Check health status of a specific proxy.

**Response:**
```json
{
  "status": "healthy",
  "responseTime": 120,
  "lastChecked": "2026-09-08T12:00:00Z"
}
```

---

## API Keys Endpoints

### GET /api-keys
List all API keys for current user.

**Response:**
```json
{
  "keys": [
    {
      "id": "key_123",
      "name": "Production API",
      "key": "pk_live_xxxxx",
      "createdAt": "2026-09-01T00:00:00Z",
      "expiresAt": "2027-09-01T00:00:00Z",
      "lastUsed": "2026-09-08T10:30:00Z",
      "status": "active"
    }
  ]
}
```

### POST /api-keys
Create new API key.

**Request Body:**
```json
{
  "name": "My API Key",
  "expiresIn": 365  // Days until expiration (optional)
}
```

**Response:**
```json
{
  "id": "key_456",
  "name": "My API Key",
  "key": "pk_live_abc123...",
  "createdAt": "2026-09-08T12:00:00Z",
  "expiresAt": "2027-09-08T12:00:00Z"
}
```

### DELETE /api-keys/:id
Revoke an API key.

---

## Usage Endpoints

### GET /usage/stats
Get usage statistics for current user.

**Query Parameters:**
- `period` (string): Time period (day, week, month)

**Response:**
```json
{
  "requests": 15000,
  "bandwidth": 2500,  // MB
  "avgResponseTime": 245,
  "successRate": 98.5
}
```

### GET /usage/quota
Get quota information for current user.

**Response:**
```json
{
  "used": 15000,
  "limit": 50000,
  "resetAt": "2026-10-01T00:00:00Z"
}
```

---

## Admin Endpoints

### GET /admin/users
List all users (admin only).

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page

**Response:**
```json
{
  "users": [
    {
      "id": "usr_123",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "user",
      "createdAt": "2026-09-01T00:00:00Z",
      "lastLogin": "2026-09-08T10:00:00Z"
    }
  ],
  "total": 250,
  "page": 1,
  "limit": 20
}
```

### PATCH /admin/users/:id
Update user details (admin only).

**Request Body:**
```json
{
  "role": "admin",
  "status": "active"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {}
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401): Missing or invalid authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (422): Invalid request data
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

---

## Rate Limits

- **Standard Plan:** 1,000 requests/minute
- **Pro Plan:** 10,000 requests/minute
- **Enterprise:** Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1725792000
```

---

## Webhooks

### Webhook Events
- `proxy.created` - New proxy added
- `proxy.failed` - Proxy health check failed
- `usage.threshold` - Usage quota at 80%
- `key.expired` - API key expired

### Webhook Payload
```json
{
  "event": "proxy.failed",
  "timestamp": "2026-09-08T12:00:00Z",
  "data": {
    "proxyId": "prx_123",
    "ip": "192.168.1.100",
    "reason": "Connection timeout"
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript
```typescript
import { ProxyClient } from '@proxyplatform/sdk'

const client = new ProxyClient('pk_live_xxxxx')

// Get random proxy
const proxy = await client.proxies.random()

// Get usage stats
const stats = await client.usage.stats('month')
```

### Python
```python
from proxyplatform import ProxyClient

client = ProxyClient('pk_live_xxxxx')

# Get random proxy
proxy = client.proxies.random()

# Get usage stats
stats = client.usage.stats('month')
```

---

## Support

- **Documentation:** https://docs.proxyplatform.com
- **API Status:** https://status.proxyplatform.com
- **Support Email:** support@proxyplatform.com
- **Discord:** https://discord.gg/proxyplatform
