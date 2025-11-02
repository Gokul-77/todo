# 🐳 Docker Deployment Guide

## ✅ All Issues Fixed!

### Logout Issue Fixed ✅
- **Problem**: Logout redirected to wrong page (app instead of landing)
- **Solution**: Changed `window.location.href` to `window.location.replace('/')`
- **Result**: Logout now properly redirects to landing page!

---

## 🐳 Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker Hub account (username: enfielder)

---

## 🚀 Quick Start

### Option 1: One-Click Docker Run
```cmd
docker-run.bat
```
This will:
1. Start both backend and frontend containers
2. Wait for services to initialize
3. Open browser automatically

### Option 2: Manual Docker Commands
```cmd
# Build images
docker-build.bat

# Run containers
docker-compose up -d

# Stop containers
docker-stop.bat
```

---

## 📦 Docker Images

### Backend Image
- **Name**: `enfielder/todo-backend:latest`
- **Base**: Python 3.11-slim
- **Port**: 8000
- **Features**:
  - Django REST API
  - JWT Authentication
  - SQLite database
  - Auto-migrations on startup

### Frontend Image
- **Name**: `enfielder/todo-frontend:latest`
- **Base**: Python 3.11-slim
- **Port**: 8080
- **Features**:
  - Custom HTTP server
  - Clean URL routing
  - All styles preserved
  - Theme persistence

---

## 🔧 Build & Deploy

### Step 1: Build Images
```cmd
docker-build.bat
```
Or manually:
```cmd
docker build -t enfielder/todo-backend:latest .
docker build -t enfielder/todo-frontend:latest ./frontend
```

### Step 2: Test Locally
```cmd
docker-compose up
```
Access at:
- Frontend: http://localhost:8080/
- Backend: http://localhost:8000/

### Step 3: Push to Docker Hub
```cmd
# Login first
docker login

# Push images
docker-push.bat
```

Or manually:
```cmd
docker push enfielder/todo-backend:latest
docker push enfielder/todo-frontend:latest
```

---

## 📁 Docker Files Created

```
TODO/
├── Dockerfile                  # Backend Dockerfile
├── frontend/
│   └── Dockerfile             # Frontend Dockerfile
├── docker-compose.yml         # Multi-container setup
├── .dockerignore              # Ignore unnecessary files
├── docker-build.bat           # Build script
├── docker-push.bat            # Push script
├── docker-run.bat             # Run script
└── docker-stop.bat            # Stop script
```

---

## 🌐 Docker Compose Services

### Backend Service
```yaml
services:
  backend:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
      - ./db.sqlite3:/app/db.sqlite3
    networks:
      - todo-network
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/todos/')"]
```

### Frontend Service
```yaml
  frontend:
    build: ./frontend
    ports:
      - "8080:8080"
    depends_on:
      - backend
    networks:
      - todo-network
```

---

## 🎯 Usage

### Start Application
```cmd
docker-run.bat
```

### View Logs
```cmd
docker-compose logs -f
```

### Stop Application
```cmd
docker-stop.bat
```

### Restart Application
```cmd
docker-compose restart
```

### Remove Everything
```cmd
docker-compose down -v
```

---

## 🔍 Verify Deployment

### Check Running Containers
```cmd
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                    STATUS    PORTS
abc123...      enfielder/todo-backend   Up        0.0.0.0:8000->8000/tcp
def456...      enfielder/todo-frontend  Up        0.0.0.0:8080->8080/tcp
```

### Check Container Logs
```cmd
# Backend logs
docker logs todo-backend

# Frontend logs
docker logs todo-frontend
```

### Test Endpoints
```cmd
# Backend health
curl http://localhost:8000/api/todos/

# Frontend
curl http://localhost:8080/
```

---

## 🌍 Deploy to Cloud

### Option 1: Railway
```cmd
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 2: Render
1. Connect GitHub repo
2. Select "Docker" as environment
3. Set ports: 8000 (backend), 8080 (frontend)
4. Deploy

### Option 3: AWS ECS
```cmd
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag enfielder/todo-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-backend:latest
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env)
```env
API_BASE_URL=http://localhost:8000/api
WS_BASE_URL=ws://localhost:8000/ws/todos/
```

---

## 📊 Docker Image Sizes

| Image | Size | Description |
|-------|------|-------------|
| Backend | ~200MB | Python + Django + dependencies |
| Frontend | ~150MB | Python + static files |
| **Total** | **~350MB** | Complete application |

---

## 🐛 Troubleshooting

### Issue: Port already in use
```cmd
# Find process using port
netstat -ano | findstr :8000
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

### Issue: Container won't start
```cmd
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Restart
docker-compose restart
```

### Issue: Database not persisting
```cmd
# Check volume
docker volume ls

# Recreate with volume
docker-compose down -v
docker-compose up -d
```

### Issue: Can't connect to backend from frontend
- Check network: `docker network inspect todo_todo-network`
- Verify backend is running: `docker ps`
- Check backend logs: `docker logs todo-backend`

---

## ✅ Features Preserved in Docker

✅ All styles and alignments  
✅ Theme persistence  
✅ User authentication  
✅ JWT tokens  
✅ User isolation  
✅ Landing page  
✅ Split-screen auth  
✅ Smooth animations  
✅ Favicon  
✅ Footer positioning  
✅ Responsive design  
✅ Clean URLs  
✅ Professional workflow  

---

## 📝 Docker Commands Reference

```cmd
# Build
docker-compose build

# Start (detached)
docker-compose up -d

# Start (with logs)
docker-compose up

# Stop
docker-compose down

# Restart
docker-compose restart

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend python manage.py createsuperuser

# Remove everything
docker-compose down -v --rmi all
```

---

## 🚀 Production Deployment Checklist

- [ ] Build Docker images
- [ ] Test locally with docker-compose
- [ ] Push images to Docker Hub
- [ ] Set environment variables
- [ ] Configure domain/DNS
- [ ] Set up SSL/TLS
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test all features

---

## 📞 Support

### Docker Hub
- Backend: https://hub.docker.com/r/enfielder/todo-backend
- Frontend: https://hub.docker.com/r/enfielder/todo-frontend

### Pull Images
```cmd
docker pull enfielder/todo-backend:latest
docker pull enfielder/todo-frontend:latest
```

### Run from Docker Hub
```cmd
docker-compose up
```

---

## 🎉 Success!

Your Todo List app is now:
- ✅ Dockerized
- ✅ Ready to deploy anywhere
- ✅ All features working
- ✅ Styles preserved
- ✅ Professional workflow

---

**Made with ❤️ by Gokul**

*Docker Username: enfielder*  
*Production-Ready. Containerized. Deployable.* 🚀
