# CI/CD Pipeline Setup

## 📋 GitHub Actions Workflows

Đã tạo 4 workflows tự động:

### 1. **Backend CI** (`.github/workflows/backend-ci.yml`)
- Chạy khi có thay đổi trong `backend/`
- Tests với PostgreSQL và Redis services
- Code coverage với Codecov
- Lint check với ruff

### 2. **Frontend CI** (`.github/workflows/frontend-ci.yml`)
- Chạy khi có thay đổi trong `frontend/`
- Build Next.js application
- Lint và type checking
- Unit tests

### 3. **Docker Build & Push** (`.github/workflows/docker-build.yml`)
- Tự động build Docker images khi push lên main
- Push images lên Docker Hub với tags
- Cache optimization

### 4. **Deploy to Production** (`.github/workflows/deploy.yml`)
- Manual deployment với `workflow_dispatch`
- Automatic deployment khi tag `v*`
- SSH-based deployment

## 🔧 Secrets cần setup trong GitHub

### Required Secrets:
```bash
DOCKERHUB_USERNAME       # Docker Hub username
DOCKERHUB_TOKEN          # Docker Hub access token
```

### Optional Secrets (cho deployment):
```bash
DEPLOY_SSH_KEY           # SSH private key cho deployment
DEPLOY_HOST              # Server host (user@host)
DEPLOY_USER              # Deployment user
DEPLOY_PATH              # Path trên server (/home/user/app)
DEPLOY_URL               # Production URL (cho health check)
```

## 🚀 Setup Steps

### 1. Configure GitHub Secrets
1. Vào repository trên GitHub
2. Settings → Secrets and variables → Actions → New repository secret
3. Thêm các secrets ở trên

### 2. Setup Docker Hub
1. Tạo access token trên Docker Hub:
   - Account Settings → Security → New Access Token
   - Cấp quyền `Read, Write, Delete`
2. Add secret `DOCKERHUB_TOKEN` với access token

### 3. Test Workflows
```bash
# Push code để trigger CI
git push origin main

# Kiểm tra workflow status trên GitHub Actions tab
```

## 📊 Code Coverage

Workflow sẽ tự động upload coverage lên Codecov:
1. Đăng ký Codecov với GitHub account
2. Thêm repository vào Codecov
3. Coverage reports sẽ tự động hiển thị

## 🔒 Security Notes

1. **Never store sensitive data in code**
2. Sử dụng GitHub Secrets cho:
   - API keys
   - Database credentials
   - SSH keys
   - Third-party service tokens

3. **Review Actions permissions:**
   - Actions có read/write permissions
   - Chỉ workflows trusted mới được run

## 🐛 Troubleshooting

### Common Issues:

**1. Tests fail với database connection**
```yaml
# Kiểm tra services trong backend-ci.yml
services:
  postgres:
    image: postgres:15-alpine
    env: ...
  redis:
    image: redis:7-alpine
```

**2. Docker build fails**
```bash
# Kiểm tra Dockerfiles:
backend/Dockerfile
frontend/Dockerfile
```

**3. Coverage không upload**
```yaml
# Cấu hình trong backend-ci.yml:
- name: Upload coverage
  uses: codecov/codecov-action@v3
  continue-on-error: true
```

## 📈 Monitoring

1. **GitHub Actions Insights:**
   - Execution time
   - Failure rates
   - Most frequent failures

2. **Notifications:**
   - Email notifications cho failed workflows
   - Slack/Teams integration (optional)

## 🔄 Workflow Triggers

| Workflow | Trigger |
|----------|---------|
| Backend CI | Push/Pull request to `backend/` |
| Frontend CI | Push/Pull request to `frontend/` |
| Docker Build | Push to `main`, tags `v*` |
| Deploy | Manual, tags `v*` |
