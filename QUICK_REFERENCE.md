# 📋 Quick Reference Card

## 🚀 Commands to Run

### Setup (First Time)
```cmd
cd e:\TODO
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

### Run Backend
```cmd
python manage.py runserver
```

### Run Frontend
```cmd
cd frontend
python -m http.server 8080
```

### Access
- **App**: http://localhost:8080/auth.html
- **API**: http://localhost:8000/api
- **Admin**: http://localhost:8000/admin

---

## 📤 Push to GitHub

```cmd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git
git push -u origin main
```

---

## 🌐 Deploy to Railway

1. Go to https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub
4. Add PostgreSQL
5. Set environment variables
6. Deploy!

---

## 🔑 Environment Variables

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgres://...
CORS_ORIGINS=https://your-domain.com
```

---

## 📁 Important Files

- `frontend/auth.html` - Login page
- `frontend/index.html` - Main app
- `frontend/script.js` - App logic
- `todos/views.py` - API endpoints
- `todos/auth_views.py` - Authentication
- `todos/consumers.py` - WebSocket
- `todoproject/settings.py` - Configuration

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found | `pip install -r requirements.txt` |
| Database error | `python manage.py migrate` |
| Can't connect | Check both servers running |
| Theme not visible | Fixed! Clear cache |
| WebSocket error | Check Channels installed |

---

## 📚 Documentation

- **COMPLETE_GUIDE.md** - Full setup & deploy
- **README.md** - Overview & features
- **GITHUB_DEPLOYMENT.md** - Deploy guide
- **FINAL_SUMMARY.md** - What's new

---

**Made with ❤️ by Gokul**
