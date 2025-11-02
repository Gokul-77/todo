# 🎯 Complete Setup & Deployment Guide

**Everything you need to run and deploy your Todo List app!**

---

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Running the Application](#running-the-application)
3. [Push to GitHub](#push-to-github)
4. [Deploy for Free](#deploy-for-free)
5. [Troubleshooting](#troubleshooting)

---

## 🖥️ Local Development Setup

### Step 1: Install Dependencies

```cmd
cd e:\TODO
pip install -r requirements.txt
```

### Step 2: Setup Database

```cmd
python manage.py makemigrations
python manage.py migrate
```

### Step 3: Create Admin User (Optional)

```cmd
python manage.py createsuperuser
```
Follow prompts to create admin account.

---

## 🚀 Running the Application

### Method 1: Using Scripts (Easiest)

**Terminal 1 - Backend:**
```cmd
start.bat
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
python -m http.server 8080
```

### Method 2: Manual Commands

**Terminal 1 - Backend:**
```cmd
python manage.py runserver
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
python -m http.server 8080
```

### Access the App

1. Open browser: http://localhost:8080/auth.html
2. Register a new account
3. Start adding todos!

**URLs:**
- **Frontend**: http://localhost:8080/auth.html
- **API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin
- **WebSocket**: ws://localhost:8000/ws/todos/

---

## 📤 Push to GitHub

### Step 1: Initialize Git

```cmd
cd e:\TODO
git init
```

### Step 2: Add Files

```cmd
git add .
git commit -m "Initial commit: Todo app with auth and WebSocket"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository" (+ icon)
3. Name: `todo-list-app`
4. Description: "Full-stack Todo List with Django & WebSocket"
5. Click "Create repository"

### Step 4: Push to GitHub

```cmd
git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

✅ **Your code is now on GitHub!**

---

## 🌐 Deploy for Free

### Option 1: Railway (Recommended) ⭐

**Why Railway?**
- ✅ Free $5 credit/month
- ✅ PostgreSQL included
- ✅ WebSocket support
- ✅ Auto-deploy from GitHub
- ✅ Easy setup

**Steps:**

1. **Sign Up**
   - Go to https://railway.app
   - Click "Login with GitHub"
   - Authorize Railway

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `todo-list-app` repository

3. **Add PostgreSQL Database**
   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
   - Railway creates database automatically

4. **Configure Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add these variables:
   
   ```
   SECRET_KEY=django-insecure-change-this-to-random-string
   DEBUG=False
   ALLOWED_HOSTS=your-app.up.railway.app
   DATABASE_URL=(auto-filled by Railway)
   CORS_ORIGINS=https://your-app.up.railway.app
   ```

5. **Update Code for Production**
   
   Add to `requirements.txt`:
   ```
   gunicorn==21.2.0
   dj-database-url==2.1.0
   whitenoise==6.6.0
   ```
   
   Create `Procfile`:
   ```
   web: gunicorn todoproject.wsgi:application
   ```
   
   Update `settings.py`:
   ```python
   import os
   import dj_database_url
   
   SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-key')
   DEBUG = os.environ.get('DEBUG', 'False') == 'True'
   ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')
   
   DATABASES = {
       'default': dj_database_url.config(
           default='sqlite:///db.sqlite3',
           conn_max_age=600
       )
   }
   
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   ```

6. **Deploy**
   - Push changes to GitHub:
     ```cmd
     git add .
     git commit -m "Add production config"
     git push
     ```
   - Railway auto-deploys!

7. **Run Migrations**
   - In Railway dashboard, go to your service
   - Click "Deploy Logs"
   - Or use Railway CLI:
     ```cmd
     railway run python manage.py migrate
     railway run python manage.py createsuperuser
     ```

8. **Update Frontend URLs**
   
   In `frontend/script.js` and `frontend/auth.js`:
   ```javascript
   const API_BASE_URL = 'https://your-app.up.railway.app/api';
   const WS_BASE_URL = 'wss://your-app.up.railway.app/ws/todos/';
   ```

9. **Access Your App**
   - Railway gives you a URL: `https://your-app.up.railway.app`
   - Visit it and start using your app!

---

### Option 2: Render

**Steps:**

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn todoproject.wsgi:application`
6. Add PostgreSQL database
7. Set environment variables (same as Railway)
8. Deploy!

**URL**: `https://your-app.onrender.com`

---

### Option 3: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Go to https://vercel.com
2. Import GitHub repository
3. Set root directory: `frontend`
4. Deploy!

**Backend on Railway:**
- Follow Railway steps above

**Update frontend to point to Railway backend URL**

---

## 🔧 Production Checklist

Before deploying:

- [ ] Update `requirements.txt` with production packages
- [ ] Create `Procfile`
- [ ] Update `settings.py` for production
- [ ] Set environment variables
- [ ] Update frontend API URLs
- [ ] Test locally with DEBUG=False
- [ ] Push to GitHub
- [ ] Deploy to hosting platform
- [ ] Run migrations on production
- [ ] Create superuser on production
- [ ] Test all features

---

## 🐛 Troubleshooting

### Local Development

**Issue: Module not found**
```cmd
pip install -r requirements.txt
```

**Issue: Database errors**
```cmd
python manage.py migrate
```

**Issue: Frontend can't connect**
- Make sure Django is running on port 8000
- Use `python -m http.server 8080` in frontend folder
- Don't open index.html directly (use http://localhost:8080)

**Issue: WebSocket not connecting**
- Check Django Channels is installed
- Verify Django server is running
- Check browser console for errors

**Issue: Theme dropdown not visible**
- Fixed! Now uses proper z-index
- Clear browser cache if needed

### Deployment

**Issue: Static files not loading**
```python
# settings.py
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... other middleware
]
```

**Issue: Database connection error**
- Check DATABASE_URL environment variable
- Verify PostgreSQL is running

**Issue: CORS errors**
- Update CORS_ALLOWED_ORIGINS with your domain
- Include https:// in the URL

**Issue: 500 Internal Server Error**
- Check deployment logs
- Verify all environment variables are set
- Run migrations: `python manage.py migrate`

---

## 📊 Commands Reference

### Development
```cmd
# Setup
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser

# Run
python manage.py runserver
cd frontend && python -m http.server 8080

# Test
python manage.py test todos
```

### Git
```cmd
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin URL
git push -u origin main

# Updates
git add .
git commit -m "Description"
git push
```

### Production
```cmd
# Collect static files
python manage.py collectstatic

# Migrations
python manage.py makemigrations
python manage.py migrate

# Create admin
python manage.py createsuperuser
```

---

## 🎉 Success!

Your Todo List app is now:
- ✅ Running locally
- ✅ On GitHub
- ✅ Deployed to the cloud
- ✅ Accessible worldwide!

**Share your app with friends!**

---

## 📱 Quick Links

- **Local Frontend**: http://localhost:8080/auth.html
- **Local API**: http://localhost:8000/api
- **GitHub**: https://github.com/YOUR_USERNAME/todo-list-app
- **Production**: https://your-app.railway.app

---

## 💡 Tips

1. **Keep your SECRET_KEY secret** - Never commit it to GitHub
2. **Use environment variables** for all sensitive data
3. **Test locally** before deploying
4. **Monitor logs** on your hosting platform
5. **Backup your database** regularly
6. **Update dependencies** periodically

---

## 🆘 Need Help?

1. Check this guide
2. Read README.md
3. Check GITHUB_DEPLOYMENT.md
4. Review browser console (F12)
5. Check Django server logs
6. Search error messages online

---

## 🌟 Next Steps

1. **Customize**: Change colors, add features
2. **Share**: Send link to friends
3. **Learn**: Explore the code
4. **Improve**: Add new features
5. **Deploy**: Try different hosting platforms

---

**Made with ❤️ by Gokul**

*Happy coding! 🚀*
