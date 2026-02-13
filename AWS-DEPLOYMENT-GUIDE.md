# AWS Deployment Guide for ONCO-EMR React App

## Quick Answers for Your DevOps Team

### Build Information
- **Build Command:** `npm run build`
- **Build Output Folder:** `dist`
- **Node Version:** 18.x or higher recommended

---

## Option 1: AWS Amplify (EASIEST - Recommended)

### What to tell DevOps:
1. Use the `amplify.yml` file in the root folder
2. Connect to Git repository
3. Amplify will automatically:
   - Install dependencies
   - Build the project
   - Deploy to CDN
   - Handle 404 routing automatically

### Steps:
1. Go to AWS Amplify Console
2. "New App" → "Host Web App"
3. Connect your GitHub/GitLab repo
4. Amplify will detect `amplify.yml` automatically
5. Deploy!

**Redirects:** Amplify handles SPA routing automatically, no extra config needed!

---

## Option 2: AWS S3 + CloudFront (Most Common)

### Step 1: Build the App
```bash
npm install
npm run build
```

### Step 2: Upload to S3
- Upload everything from the `dist` folder to S3 bucket
- Enable "Static Website Hosting" on S3 bucket
- Set both Index and Error document to: `index.html`

### Step 3: CloudFront Configuration
**IMPORTANT:** To fix 404 issues with React Router, configure CloudFront Error Pages:

```
Error Code: 403
Response Page Path: /index.html
Response Code: 200

Error Code: 404
Response Page Path: /index.html
Response Code: 200
```

**Why?** When users visit `/patients` directly, CloudFront looks for `/patients` file (doesn't exist → 404). 
We redirect to `/index.html` and React Router handles the routing client-side.

### Full S3 + CloudFront Setup:

1. **S3 Bucket:**
   - Create bucket (e.g., `onco-emr-app`)
   - Disable "Block all public access"
   - Enable Static Website Hosting
   - Set Index: `index.html` and Error: `index.html`

2. **Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::onco-emr-app/*"
    }
  ]
}
```

3. **CloudFront Distribution:**
   - Origin: Your S3 bucket website endpoint
   - Viewer Protocol: Redirect HTTP to HTTPS
   - Default Root Object: `index.html`
   - **Custom Error Responses:** (see above)

---

## Option 3: Docker Container on AWS (Your Current Setup)

**Perfect if your other projects use Docker!**

### Files Created:
- ✅ `Dockerfile` - Multi-stage build (Node + Nginx)
- ✅ `nginx.conf` - Handles React Router (404 → index.html)
- ✅ `.dockerignore` - Optimizes build
- ✅ `docker-compose.yml` - For local testing

### Quick Test Locally:
```bash
# Build and run
docker-compose up --build

# Or manually:
docker build -t onco-emr .
docker run -p 80:80 onco-emr

# Visit: http://localhost
```

---

### AWS Deployment Options with Docker:

#### **Option 3A: AWS ECS (Elastic Container Service) - RECOMMENDED for Docker**

**What to tell DevOps:**
1. Push Docker image to ECR (Elastic Container Registry)
2. Create ECS Task Definition
3. Deploy to ECS Fargate (serverless) or EC2

**Steps:**
```bash
# 1. Build image
docker build -t onco-emr .

# 2. Tag for ECR
docker tag onco-emr:latest <account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest

# 3. Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest

# 4. Create ECS Service (DevOps does this in AWS Console or with Terraform)
```

**ECS Task Definition JSON:**
```json
{
  "family": "onco-emr",
  "containerDefinitions": [
    {
      "name": "onco-emr-app",
      "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "memory": 512,
      "cpu": 256
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "256",
  "memory": "512"
}
```

**Nginx in Docker already handles 404 routing! No extra config needed.**

---

#### **Option 3B: AWS EKS (Kubernetes) - For large scale**

If you use Kubernetes:

**Deployment YAML:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: onco-emr
spec:
  replicas: 2
  selector:
    matchLabels:
      app: onco-emr
  template:
    metadata:
      labels:
        app: onco-emr
    spec:
      containers:
      - name: onco-emr
        image: <account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: onco-emr-service
spec:
  type: LoadBalancer
  selector:
    app: onco-emr
  ports:
  - port: 80
    targetPort: 80
```

---

#### **Option 3C: Docker on EC2** 

Simple approach - just run Docker on EC2:

```bash
# On EC2 instance
docker pull <account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest
docker run -d -p 80:80 --name onco-emr <account-id>.dkr.ecr.<region>.amazonaws.com/onco-emr:latest
```

---

## Comparison Table

| Method | Difficulty | Cost | Auto-Deploy | Best For |
|--------|-----------|------|-------------|----------|
| **Amplify** | ⭐ Easy | $$ | ✅ Yes | Quick setup, CI/CD |
| **S3 + CloudFront** | ⭐⭐ Medium | $ | ❌ Manual | Production, cost-effective |
| **Docker + ECS** | ⭐⭐ Medium | $$ | ✅ Yes (CI/CD) | **Your current setup** |
| **Docker + EKS** | ⭐⭐⭐ Hard | $$$ | ✅ Yes | Large scale, K8s |
| **Docker on EC2** | ⭐⭐ Medium | $$ | ❌ Manual | Simple Docker setup |

---

## Files in This Repo

**For Docker Deployment:**
- `Dockerfile` - Multi-stage build (Node build + Nginx serve)
- `nginx.conf` - Nginx config with React Router support (handles 404)
- `.dockerignore` - Optimizes Docker build
- `docker-compose.yml` - For local testing

**For Other Platforms:**
- `vercel.json` - For Vercel (ignore for AWS)
- `amplify.yml` - For AWS Amplify
- `public/_redirects` - For Netlify/Vercel (ignore for AWS)

---

## Common Questions

**Q: Why do we need special 404 handling?**
A: Your app uses React Router. When users visit `/patients`, AWS thinks it's a file path, returns 404. We need to redirect everything to `index.html` so React Router can handle routing.

**Q: What is the difference between vercel.json and AWS config?**
A: Same purpose, different syntax. `vercel.json` uses rewrites. AWS uses CloudFront error pages or Nginx try_files.

**Q: Do I need all these files (vercel.json, amplify.yml, _redirects, Dockerfile)?**
A: No harm keeping them. Use the right one for your platform:
- **Docker (ECS/EKS/EC2) → `Dockerfile` + `nginx.conf`** ← Your current setup
- Vercel → `vercel.json`
- Amplify → `amplify.yml`
- S3 + CloudFront → Configure in AWS Console
- Netlify → `_redirects`

**Q: How does Docker handle 404 issues?**
A: The `nginx.conf` file has `try_files $uri $uri/ /index.html;` which redirects all non-existent routes to index.html, allowing React Router to handle routing. No additional AWS configuration needed!

---

## Recommendation

**Since your team uses Docker:** AWS ECS with Fargate (Option 3A)
- Consistent with your existing projects
- Docker handles everything (build + nginx routing)
- Easy to integrate with CI/CD pipeline
- No extra 404 config needed (nginx.conf handles it)

**Tell DevOps:**
1. "Use the Dockerfile - it's a multi-stage build"
2. "Push image to ECR and deploy to ECS Fargate"
3. "The nginx.conf already handles React Router 404s"
4. "Container runs on port 80"

**Alternative if no Docker:** AWS Amplify (Option 1)
- Easiest to set up
- Handles routing automatically
- Has CI/CD built-in
