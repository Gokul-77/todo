# GitHub Deployment Guide

Complete guide to push your Todo List app to GitHub and deploy it for free.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account (free)
- Your project ready in `e:\TODO`

---

## 🚀 Step 1: Initialize Git Repository

Open Command Prompt in your project folder:

```cmd
cd e:\TODO
git init
```

---

## 📝 Step 2: Create .gitignore (Already Done!)

Your project already has a `.gitignore` file that excludes:
- `__pycache__/`
- `*.pyc`
- `db.sqlite3`
- `venv/`
- `.env`

---

## 🔐 Step 3: Secure Your Secrets

**IMPORTANT**: Never commit sensitive data!

1. Create `.env` file (don't commit this):
```bash
SECRET_KEY=your-production-secret-key-here
DEBUG=False
DATABASE_URL=your-database-url
```

2. Use `.env.example` as template (already created)

---

## 📦 Step 4: Add Files to Git

```cmd
git add .
git commit -m "Initial commit: Full-stack Todo app with authentication and WebSocket"
```

---

## 🌐 Step 5: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **"New repository"** (+ icon, top right)
3. Fill in details:
   - **Repository name**: `todo-list-app` (or your choice)
   - **Description**: "Full-stack Todo List with Django, WebSocket & Authentication"
   - **Visibility**: Public or Private
   - **DON'T** initialize with README (you already have one)
4. Click **"Create repository"**

---

## 🔗 Step 6: Connect Local to GitHub

GitHub will show you commands. Use these:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## ✅ Step 7: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files!
3. Check that sensitive files (.env, db.sqlite3) are NOT there

---

## 🎉 Your Code is Now on GitHub!

Repository URL: `https://github.com/YOUR_USERNAME/todo-list-app`

---

## 🔄 Future Updates

When you make changes:

```cmd
git add .
git commit -m "Description of changes"
git push
```

---

## 📱 Free Hosting Options

Now that your code is on GitHub, deploy it for FREE:

### Option 1: **Railway** (Recommended for Django)
✅ Free tier available  
✅ Supports Django + PostgreSQL  
✅ WebSocket support  
✅ Easy deployment  

**Steps:**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `todo-list-app` repository
5. Railway auto-detects Django
6. Add PostgreSQL database (click "New" → "Database" → "PostgreSQL")
7. Set environment variables:
   ```
   SECRET_KEY=your-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-app.railway.app
   DATABASE_URL=(auto-filled by Railway)
   ```
8. Deploy! 🚀

**Railway will give you a URL**: `https://your-app.railway.app`

---

### Option 2: **Render** (Great Alternative)
✅ Free tier available  
✅ PostgreSQL included  
✅ Auto-deploy from GitHub  

**Steps:**
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: todo-list-app
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn todoproject.wsgi:application`
6. Add environment variables (same as Railway)
7. Create PostgreSQL database (free tier)
8. Deploy!

**Render will give you a URL**: `https://your-app.onrender.com`

---

### Option 3: **PythonAnywhere** (Simple but Limited)
✅ Free tier available  
✅ Easy for beginners  
❌ No WebSocket support on free tier  

**Steps:**
1. Go to [PythonAnywhere.com](https://www.pythonanywhere.com)
2. Create free account
3. Open Bash console
4. Clone your repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todo-list-app.git
   ```
5. Setup virtual environment:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.10 todoenv
   pip install -r todo-list-app/requirements.txt
   ```
6. Configure web app in "Web" tab
7. Set WSGI configuration

**URL**: `https://YOUR_USERNAME.pythonanywhere.com`

---

### Option 4: **Vercel** (Frontend Only)
For frontend deployment only (static files):

1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `frontend`
4. Deploy!

**Note**: You'll need separate backend hosting (Railway/Render)

---

## 🔧 Pre-Deployment Checklist

Before deploying, update these files:

### 1. Update `requirements.txt`
```txt
Django==4.2.7
django-cors-headers==4.3.1
channels==4.0.0
channels-redis==4.1.0
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
gunicorn==21.2.0
psycopg2-binary==2.9.9
dj-database-url==2.1.0
whitenoise==6.6.0
```

### 2. Update `settings.py` for Production

Add at the top:
```python
import os
import dj_database_url
```

Update settings:
```python
# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-key-change-this')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... rest of middleware
]

# CORS for production
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:8080').split(',')
```

### 3. Create `Procfile` (for Railway/Render)
```
web: gunicorn todoproject.wsgi:application
```

### 4. Create `runtime.txt` (optional)
```
python-3.11.0
```

### 5. Update Frontend URLs

In `frontend/script.js` and `frontend/auth.js`:
```javascript
// Change from:
const API_BASE_URL = 'http://localhost:8000/api';

// To:
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/api'
    : 'https://your-app.railway.app/api';  // Your production URL
```

---

## 🔒 Security Best Practices

1. **Generate a strong SECRET_KEY**:
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

2. **Use environment variables** for all secrets

3. **Enable HTTPS** (Railway/Render do this automatically)

4. **Set secure cookies** in production:
   ```python
   SESSION_COOKIE_SECURE = True
   CSRF_COOKIE_SECURE = True
   ```

5. **Update CORS settings** to only allow your frontend domain

---

## 📊 Post-Deployment Steps

After deployment:

1. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

2. **Create superuser**:
   ```bash
   python manage.py createsuperuser
   ```

3. **Collect static files**:
   ```bash
   python manage.py collectstatic
   ```

4. **Test the app**:
   - Register a new user
   - Create todos
   - Test WebSocket connection
   - Check all CRUD operations

---

## 🐛 Troubleshooting

### Issue: Static files not loading
**Solution**: 
```python
# settings.py
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### Issue: Database connection error
**Solution**: Check DATABASE_URL environment variable

### Issue: CORS errors
**Solution**: Update CORS_ALLOWED_ORIGINS with your frontend URL

### Issue: WebSocket not connecting
**Solution**: 
- Railway: Supports WebSocket by default
- Render: Enable WebSocket in settings
- PythonAnywhere: Not supported on free tier

---

## 📈 Monitoring Your App

### Railway
- View logs in dashboard
- Monitor resource usage
- Set up alerts

### Render
- Check deployment logs
- View metrics
- Configure health checks

---

## 💰 Cost Breakdown

### Free Tiers:
- **Railway**: $5 free credit/month (enough for small apps)
- **Render**: 750 hours/month free
- **PythonAnywhere**: Always free (limited features)
- **Vercel**: Unlimited for personal projects

### When to Upgrade:
- High traffic (>10k requests/month)
- Need more database storage
- Require 24/7 uptime
- Need custom domain

---

## 🎓 Next Steps

1. **Custom Domain**: 
   - Buy domain from Namecheap/Google Domains
   - Configure DNS in Railway/Render

2. **SSL Certificate**: 
   - Automatic with Railway/Render
   - Free with Let's Encrypt

3. **CI/CD**: 
   - Auto-deploy on git push
   - Run tests before deployment

4. **Monitoring**:
   - Setup error tracking (Sentry)
   - Add analytics (Google Analytics)

---

## 📚 Useful Resources

- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [GitHub Actions for CI/CD](https://github.com/features/actions)

---

## ✅ Deployment Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] `.env` file NOT in repository
- [ ] SECRET_KEY changed for production
- [ ] DEBUG = False
- [ ] ALLOWED_HOSTS configured
- [ ] Database migrated
- [ ] Static files collected
- [ ] Superuser created
- [ ] CORS configured
- [ ] Frontend URLs updated
- [ ] All features tested
- [ ] Error handling in place
- [ ] Backup strategy planned

---

## 🎉 Congratulations!

Your Todo List app is now:
- ✅ On GitHub
- ✅ Deployed to the cloud
- ✅ Accessible worldwide
- ✅ Free to use!

**Share your app**: `https://your-app.railway.app`

---

*Made with ❤️ by Gokul*
