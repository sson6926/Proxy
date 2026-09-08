# Proxy Platform - User Guide

## Getting Started

### 1. Create an Account
1. Visit http://localhost:8080/register
2. Enter your email, username, and password
3. Click "Đăng ký" to create your account
4. You'll be automatically logged in

### 2. Dashboard Overview
After logging in, you'll see:
- **Total Proxies**: Number of available proxies
- **Active Proxies**: Currently healthy proxies
- **Total Requests**: Your API usage count
- **Avg Response**: Average response time

---

## Managing API Keys

### Creating an API Key
1. Navigate to **API Keys** in the sidebar
2. Click **+ Create Key**
3. Enter a name for your key (e.g., "Production API")
4. Click **Create**
5. **Important**: Copy your key immediately - it won't be shown again!

### Using Your API Key
Include your API key in all requests:
```bash
curl -H "Authorization: Bearer pk_live_xxxxx" \
  http://localhost:8000/api/v1/proxies/random
```

### Revoking a Key
1. Go to **API Keys**
2. Find the key you want to revoke
3. Click **Delete**
4. Confirm the deletion

---

## Using Proxies

### Getting a Random Proxy
```bash
# Get any random proxy
curl -H "Authorization: Bearer YOUR_KEY" \
  http://localhost:8000/api/v1/proxies/random

# Get HTTP proxy
curl -H "Authorization: Bearer YOUR_KEY" \
  "http://localhost:8000/api/v1/proxies/random?protocol=http"

# Get US proxy
curl -H "Authorization: Bearer YOUR_KEY" \
  "http://localhost:8000/api/v1/proxies/random?country=US"
```

### Listing Proxies
```bash
# List 10 proxies
curl -H "Authorization: Bearer YOUR_KEY" \
  "http://localhost:8000/api/v1/proxies?limit=10"

# Filter by protocol and country
curl -H "Authorization: Bearer YOUR_KEY" \
  "http://localhost:8000/api/v1/proxies?protocol=https&country=UK"
```

### Checking Proxy Health
```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  http://localhost:8000/api/v1/proxies/prx_123/check
```

---

## Monitoring Usage

### Viewing Usage Stats
1. Click **Usage** in the sidebar
2. Select time period (Day/Week/Month)
3. View:
   - Total requests
   - Bandwidth usage
   - Average response time
   - Success rate

### Checking Quota
- See your current quota usage
- Progress bar shows percentage used
- Resets monthly

---

## Proxy Rotation

### Setting Up Rotation
1. Navigate to **Proxy Rotation**
2. Choose rotation strategy:
   - **Random**: Select randomly
   - **Round Robin**: Rotate in order
   - **Latency Based**: Select fastest
   - **Geographic**: Select by location

3. Configure settings:
   - Enable **Health Check** for automatic failover
   - Enable **Auto-switch** for automatic rotation
   - Set **Refresh Interval** (seconds)

### Adding Proxies to Pool
1. Enter proxy URL in format: `http://proxy.example.com:8080`
2. Click **Add to Pool**
3. Proxies will be rotated based on your strategy

### Manual Rotation
Click **Rotate Now** to immediately switch to a new proxy

---

## Admin Features (Admin Only)

### User Management
1. Navigate to **Admin** → **Users**
2. View all users
3. Filter by role, status
4. Edit user details
5. Suspend/activate accounts

### API Key Management
1. Go to **Admin** → **API Keys**
2. View all API keys across users
3. Filter by status (active/expired/revoked)
4. Revoke keys if needed
5. Export data to CSV

### System Monitoring
- View system health
- Monitor proxy uptime
- Check API response times

---

## Troubleshooting

### Can't Login
- Verify email and password
- Check if account is activated
- Try password reset

### API Key Not Working
- Ensure key is active
- Check if key has expired
- Verify correct Authorization header format

### No Proxies Available
- Check your quota limit
- Try different filters
- Contact support if issue persists

### Slow Response Times
- Try different proxy
- Check your network connection
- Switch to geographic rotation strategy

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Dashboard | `D` |
| API Keys | `K` |
| Usage | `U` |
| Proxy Rotation | `R` |
| Settings | `S` |
| Logout | `L` |

---

## Support

- **Email**: support@proxyplatform.com
- **Discord**: https://discord.gg/proxyplatform
- **Documentation**: https://docs.proxyplatform.com
- **Status Page**: https://status.proxyplatform.com

---

## Best Practices

1. **API Key Security**
   - Never share your API key
   - Use different keys for different environments
   - Rotate keys periodically

2. **Proxy Selection**
   - Use geographic rotation for location-specific tasks
   - Enable health checks for reliability
   - Monitor usage to stay within quota

3. **Error Handling**
   - Always handle rate limits (429 errors)
   - Implement retry logic for failed requests
   - Log errors for debugging

4. **Performance**
   - Cache proxy list locally
   - Use connection pooling
   - Batch requests when possible
