# 🚀 Complete Setup Instructions

## ✅ Everything is Ready!

Your Todo List app now has:
- ✅ Beautiful landing page
- ✅ Split-screen authentication with animations
- ✅ User registration & login
- ✅ JWT authentication
- ✅ WebSocket real-time updates
- ✅ Theme persistence across all pages
- ✅ Responsive design
- ✅ Favicon with checkmark icon
- ✅ Logout functionality

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies & Setup Database
```cmd
cd e:\TODO
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

### Step 2: Start Backend Server
```cmd
python manage.py runserver
```
✅ Backend running at: http://localhost:8000

### Step 3: Start Frontend Server
**Open a NEW terminal:**
```cmd
cd e:\TODO\frontend
python -m http.server 8080
```
✅ Frontend running at: http://localhost:8080

---

## 🌐 Access Your App

1. **Landing Page**: http://localhost:8080/
2. **Login/Register**: http://localhost:8080/auth.html
3. **Main App**: http://localhost:8080/app.html (auto-redirects if not logged in)
4. **API**: http://localhost:8000/api
5. **Admin Panel**: http://localhost:8000/admin

---

## 📱 User Flow

### First Time User
1. Visit http://localhost:8080/
2. Click "Get Started" button
3. Click "Create New Account" (animated slide)
4. Fill in:
   - Username (required)
   - Email (optional)
   - Password (min 6 characters)
   - Confirm Password
5. Click "Sign Up"
6. ✅ Auto-logged in → Redirected to app

### Returning User
1. Visit http://localhost:8080/auth.html
2. Enter username & password
3. Click "Sign In"
4. ✅ Logged in → See your todos

---

## 🎨 Features Overview

### Landing Page (index.html)
- Hero section with animated illustration
- Feature cards with icons
- Stats display
- About section
- CTA buttons
- Theme toggle (persists across pages)
- Responsive design

### Auth Page (auth.html)
- **Split-screen layout**
- **Login mode** (default):
  - Form on left
  - Welcome content on right
- **Signup mode** (after clicking "Create Account"):
  - Welcome content slides to left
  - Signup form slides in from right
- **Smooth animations** (400ms)
- **Glass-morphism cards**
- **Theme toggle** (top-right)
- **Back to home** button (top-left)

### Main App (app.html)
- User avatar with initial
- Welcome message
- Todo list grouped by date
- Real-time WebSocket updates
- Theme selector
- Logout button
- Statistics dashboard

---

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register/`
   - Returns JWT access & refresh tokens
   - Stores in localStorage
   - Auto-redirects to app

2. **Login**: POST `/api/auth/login/`
   - Returns JWT tokens
   - Stores in localStorage
   - Auto-redirects to app

3. **Protected Routes**: All todo endpoints require JWT
   - Token sent in `Authorization: Bearer <token>` header
   - 401 response → Auto-logout

4. **Logout**: Clears localStorage → Redirects to auth page

---

## 🎨 Theme System

### Available Themes
1. ☀️ **Light** - Clean & professional
2. 🌙 **Dark** - Easy on the eyes
3. 🧁 **Cupcake** - Sweet & colorful
4. 🌲 **Forest** - Nature-inspired

### Theme Persistence
- Selected theme saved to `localStorage`
- Loads automatically on all pages
- Synced across landing, auth, and app pages

---

## 🔌 API Endpoints

### Authentication (Public)
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user

### Todos (Protected - Requires JWT)
- `GET /api/todos/` - Get user's todos
- `POST /api/todos/create/` - Create todo
- `PUT /api/todos/<id>/finish/` - Mark finished
- `PUT /api/todos/<id>/unfinish/` - Mark unfinished
- `DELETE /api/todos/<id>/delete/` - Delete todo

### WebSocket
- `ws://localhost:8000/ws/todos/` - Real-time updates

---

## 🐛 Troubleshooting

### Issue: "Module not found"
```cmd
pip install -r requirements.txt
```

### Issue: "No such table: todos_todo"
```cmd
python manage.py migrate
```

### Issue: "401 Unauthorized"
- You're not logged in
- Token expired (7 days)
- Solution: Login again

### Issue: "Can't connect to server"
- Make sure Django is running: `python manage.py runserver`
- Make sure frontend server is running: `python -m http.server 8080`
- Check ports 8000 and 8080 are not in use

### Issue: "WebSocket not connecting"
- Django Channels installed? `pip install channels`
- Check Django server logs
- WebSocket connects after login

### Issue: "Theme not changing"
- Clear browser cache
- Check browser console for errors
- Theme saved in localStorage

---

## 📁 File Structure

```
TODO/
├── frontend/
│   ├── index.html           ← Landing page
│   ├── auth.html            ← Split-screen login/signup
│   ├── auth.js              ← Auth logic + animations
│   ├── auth_styles.css      ← Auth page styles
│   ├── app.html             ← Main todo app
│   └── script.js            ← App logic + WebSocket
│
├── todos/
│   ├── models.py            ← Todo model with user
│   ├── views.py             ← Todo API views
│   ├── auth_views.py        ← Authentication views
│   ├── consumers.py         ← WebSocket consumer
│   └── routing.py           ← WebSocket routing
│
└── todoproject/
    ├── settings.py          ← Django config
    └── asgi.py              ← WebSocket config
```

---

## 🧪 Testing Checklist

- [ ] Visit landing page
- [ ] Click "Get Started"
- [ ] Register new account
- [ ] Auto-redirected to app
- [ ] Add a todo
- [ ] Mark todo as finished
- [ ] Delete todo
- [ ] Change theme
- [ ] Logout
- [ ] Login again
- [ ] See your todos (persisted)
- [ ] Open in 2 browsers (WebSocket sync)
- [ ] Test on mobile

---

## 🎯 What's Working

✅ Landing page with hero & features  
✅ Split-screen auth with animations  
✅ User registration & login  
✅ JWT token authentication  
✅ User-specific todos  
✅ Real-time WebSocket updates  
✅ Theme persistence  
✅ Responsive design  
✅ Favicon  
✅ Logout functionality  
✅ Session timeout (7 days)  
✅ Auto-redirect on 401  
✅ Glass-morphism UI  
✅ Smooth animations  
✅ Heroicons throughout  

---

## 🚀 Next Steps

1. **Test Everything**:
   ```cmd
   # Terminal 1
   python manage.py runserver
   
   # Terminal 2
   cd frontend
   python -m http.server 8080
   ```

2. **Visit**: http://localhost:8080/

3. **Create Account** & **Start Using!**

4. **Deploy** (when ready):
   - See `GITHUB_DEPLOYMENT.md`
   - See `COMPLETE_GUIDE.md`

---

## 💡 Tips

- **Session Duration**: 7 days (configurable in settings.py)
- **Password**: Minimum 6 characters
- **Email**: Optional for registration
- **Theme**: Persists across all pages
- **WebSocket**: Auto-reconnects on disconnect
- **Logout**: Clears all session data

---

## 📞 Support

Having issues?
1. Check this guide
2. Check browser console (F12)
3. Check Django server logs
4. Verify both servers are running
5. Clear browser cache & localStorage

---

**Made with ❤️ by Gokul**

*Everything is ready to go! Just run the servers and enjoy your app!* 🎉
