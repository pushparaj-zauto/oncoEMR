# Docker Deployment - Quick Reference

## For Your DevOps Team

### Build Information
- **Build Output:** Docker image (multi-stage build)
- **Final Image:** nginx:alpine with built React app
- **Port:** 80
- **404 Handling:** ✅ Already configured in nginx.conf

---

## Quick Start (Local Testing)

```bash
# Test with docker-compose
docker-compose up --build

# Or build manually
docker build -t onco-emr .
docker run -p 80:80 onco-emr

# Visit: http://localhost
```

---

## AWS ECS Deployment (Recommended)

### Step 1: Build and Tag
```bash
# Build
docker build -t onco-emr .

# Tag for ECR
docker tag onco-emr:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/onco-emr:latest
```

### Step 2: Push to ECR
```bash
# Login to ECR
aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

# Push
docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/onco-emr:latest
```

### Step 3: Deploy to ECS
DevOps creates:
1. ECS Cluster (Fargate or EC2)
2. Task Definition (see AWS-DEPLOYMENT-GUIDE.md)
3. ECS Service with Load Balancer

**Key Config:**
- Container Port: 80
- Memory: 512 MB (minimum)
- CPU: 256 (minimum)

---

## How It Works

1. **Stage 1 (Builder):** 
   - Uses Node.js image
   - Installs dependencies
   - Runs `npm run build`
   - Creates `dist` folder

2. **Stage 2 (Runtime):**
   - Uses lightweight nginx:alpine
   - Copies `dist` folder from builder
   - Copies `nginx.conf` (handles React Router)
   - Exposes port 80

**Result:** Small, optimized image (~25MB) ready to deploy!

---

## React Router 404 Handling

**Problem:** User visits `/patients` directly → Nginx looks for `/patients` file → 404

**Solution:** In `nginx.conf`:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This means:
1. Try to find the file (`$uri`)
2. Try to find the directory (`$uri/`)
3. If not found, serve `index.html` (React Router takes over)

✅ **No AWS configuration needed for 404s when using Docker!**

---

## CI/CD Pipeline Example

```yaml
# Example GitHub Actions / GitLab CI
- name: Build Docker image
  run: docker build -t onco-emr .

- name: Push to ECR
  run: |
    docker tag onco-emr:latest $ECR_URI:latest
    docker push $ECR_URI:latest

- name: Deploy to ECS
  run: |
    aws ecs update-service --cluster onco-cluster --service onco-emr --force-new-deployment
```

---

## Troubleshooting

**Build fails?**
- Check Node version in Dockerfile (currently 18)
- Verify package.json exists

**404 errors in production?**
- Check nginx.conf is copied correctly
- Verify try_files directive exists

**Container won't start?**
- Check logs: `docker logs <container-id>`
- Verify port 80 is not blocked

---

## Files Explained

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node (build) + Nginx (serve) |
| `nginx.conf` | Nginx config with React Router support |
| `.dockerignore` | Excludes node_modules, .git, etc. from build |
| `docker-compose.yml` | Local testing convenience |
