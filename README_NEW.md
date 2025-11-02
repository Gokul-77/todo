# 🚀 Todo List Web Application

A modern, full-stack Todo List application with **user authentication**, **real-time WebSocket updates**, and a beautiful responsive UI.

**Made with ❤️ by Gokul**

---

## ✨ Features

### 🔐 **Authentication System**
- User registration and login
- JWT token-based authentication
- Secure password handling
- Session management

### 📝 **Todo Management**
- Create, read, update, delete todos
- Mark todos as finished/unfinished
- Automatic timestamp tracking (created & finished times)
- Todos grouped by date (Today, Yesterday, specific dates)
- Each user sees only their own todos

### ⚡ **Real-Time Updates**
- WebSocket integration for live updates
- Instant synchronization across devices
- Auto-reconnection on disconnect

### 🎨 **Modern UI**
- Responsive design with TailwindCSS & DaisyUI
- 4 beautiful themes (Light, Dark, Cupcake, Forest)
- Smooth animations and transitions
- Clean, intuitive interface
- User avatar and profile menu

### 📊 **Statistics Dashboard**
- Real-time counters (Total, Completed, Pending)
- Visual progress indicators

---

## 🛠️ Tech Stack

### Backend
- **Django 4.2.7** - Web framework
- **Django Channels** - WebSocket support
- **Django REST Framework** - API
- **JWT Authentication** - Secure tokens
- **SQLite** (dev) / **PostgreSQL** (prod)

### Frontend
- **HTML5** - Structure
- **TailwindCSS** - Styling
- **DaisyUI** - Components
- **Vanilla JavaScript** - Logic
- **WebSocket API** - Real-time updates

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

**Option 1: Automated Setup (Recommended)**
```cmd
setup.bat
```

**Option 2: Manual Setup**
```cmd
# 1. Install dependencies
pip install -r requirements.txt

# 2. Create migrations
python manage.py makemigrations

# 3. Run migrations
python manage.py migrate

# 4. (Optional) Create admin user
python manage.py createsuperuser
```

### Running the Application

**Terminal 1 - Backend:**
```cmd
python manage.py runserver
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
python -m http.server 8080
```

**Access the App:**
- Frontend: http://localhost:8080/auth.html
- API: http://localhost:8000/api
- Admin: http://localhost:8000/admin

---

## 📱 Usage

### First Time Setup
1. Open http://localhost:8080/auth.html
2. Click "Register" to create an account
3. Fill in username, email (optional), and password
4. You'll be automatically logged in

### Using the App
1. **Add Todo**: Type in the input field and press Enter or click Add
2. **Complete Todo**: Click the checkbox
3. **Delete Todo**: Click the trash icon
4. **Change Theme**: Click the sun icon → Select theme
5. **Logout**: Click your avatar → Logout

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user info

### Todos (Requires Authentication)
- `GET /api/todos/` - Get all user's todos
- `POST /api/todos/create/` - Create new todo
- `GET /api/todos/<id>/` - Get specific todo
- `PUT /api/todos/<id>/finish/` - Mark as finished
- `PUT /api/todos/<id>/unfinish/` - Mark as unfinished
- `DELETE /api/todos/<id>/delete/` - Delete todo

### WebSocket
- `ws://localhost:8000/ws/todos/` - Real-time todo updates

---

## 📁 Project Structure

```
TODO/
├── todoproject/              # Django project
│   ├── settings.py          # Configuration
│   ├── urls.py              # URL routing
│   ├── asgi.py              # ASGI config (WebSocket)
│   └── wsgi.py              # WSGI config
│
├── todos/                    # Main Django app
│   ├── models.py            # Todo model with user relation
│   ├── views.py             # API views
│   ├── auth_views.py        # Authentication views
│   ├── consumers.py         # WebSocket consumer
│   ├── routing.py           # WebSocket routing
│   ├── urls.py              # API URLs
│   └── migrations/          # Database migrations
│
├── frontend/                 # Frontend files
│   ├── auth.html            # Login/Register page
│   ├── auth.js              # Authentication logic
│   ├── index.html           # Main app page
│   └── script.js            # App logic + WebSocket
│
├── setup.bat                # Automated setup script
├── start.bat                # Quick start script
├── requirements.txt         # Python dependencies
├── README.md                # This file
├── GITHUB_DEPLOYMENT.md     # GitHub & hosting guide
└── ... (other docs)
```

---

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing
- ✅ CSRF protection
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ User data isolation
- ✅ Secure WebSocket connections

---

## 🎨 Themes

Choose from 4 beautiful themes:
- ☀️ **Light** - Clean and professional
- 🌙 **Dark** - Easy on the eyes
- 🧁 **Cupcake** - Sweet and colorful
- 🌲 **Forest** - Nature-inspired

Theme preference is saved in localStorage.

---

## 🌐 Deployment

### Deploy to GitHub
```cmd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git
git push -u origin main
```

### Free Hosting Options

**Railway (Recommended)**
1. Go to [Railway.app](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL database
4. Set environment variables
5. Deploy! 🚀

**Render**
1. Go to [Render.com](https://render.com)
2. Import GitHub repository
3. Configure build & start commands
4. Add PostgreSQL
5. Deploy!

**Full deployment guide**: See `GITHUB_DEPLOYMENT.md`

---

## 🧪 Testing

Run the test suite:
```cmd
python manage.py test todos
```

Test coverage includes:
- Model creation and methods
- API endpoints
- Authentication flow
- CRUD operations
- Error handling

---

## 📚 Documentation

- **README.md** - This file (overview)
- **QUICKSTART.md** - 3-minute setup guide
- **GITHUB_DEPLOYMENT.md** - GitHub & hosting guide
- **DEPLOYMENT.md** - Production deployment (PostgreSQL)
- **PROJECT_STRUCTURE.md** - Architecture details
- **API_REFERENCE.md** - Complete API documentation

---

## 🔧 Configuration

### Environment Variables

Create `.env` file (use `.env.example` as template):
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ORIGINS=http://localhost:8080
```

### Frontend Configuration

Update API URLs in `frontend/script.js` and `frontend/auth.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
const WS_BASE_URL = 'ws://localhost:8000/ws/todos/';
```

---

## 🐛 Troubleshooting

### Issue: Can't connect to backend
**Solution**: Make sure Django server is running on port 8000

### Issue: WebSocket not connecting
**Solution**: 
- Check Django Channels is installed
- Verify WebSocket URL is correct
- Check browser console for errors

### Issue: Authentication errors
**Solution**:
- Clear localStorage
- Check token expiration
- Verify API endpoints

### Issue: Theme dropdown not visible
**Solution**: Fixed! Now uses `z-index: 100` for proper layering

### Issue: CORS errors
**Solution**: Already configured for localhost. For production, update `CORS_ALLOWED_ORIGINS` in settings.py

---

## 🎯 Future Enhancements

Planned features:
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search and filter
- [ ] Bulk operations
- [ ] Todo sharing
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Recurring todos
- [ ] File attachments
- [ ] Dark mode auto-switch

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Gokul**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Project: [Todo List App](https://github.com/YOUR_USERNAME/todo-list-app)

---

## 🙏 Acknowledgments

Built with:
- Django & Django Channels
- TailwindCSS & DaisyUI
- Django REST Framework
- JWT Authentication

---

## 📞 Support

Having issues? Check:
1. This README
2. QUICKSTART.md for setup
3. GITHUB_DEPLOYMENT.md for deployment
4. Browser console for errors
5. Django server logs

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ by Gokul**

*Full-stack Todo List with Authentication & Real-time Updates*
