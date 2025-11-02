# 📝 Todo List Web App - Professional Edition

A modern, full-stack todo list application with user authentication, real-time updates, and beautiful UI.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Django](https://img.shields.io/badge/django-4.2.7-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔐 **User Authentication** - JWT-based secure login/register
- 👤 **User Isolation** - Each user sees only their own todos
- 🎨 **Multiple Themes** - Light, Dark, Cupcake, Forest
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Modern UI** - TailwindCSS + DaisyUI
- 💾 **Persistent Storage** - SQLite database
- ⚡ **Fast & Lightweight** - Optimized performance
- 🎯 **Professional Workflow** - Easy setup and deployment

---

## 🚀 Quick Start (3 Options)

### Option 1: One-Click Start (Recommended)
```cmd
start_all.bat
```
This will:
- Start backend server
- Start frontend server  
- Open browser automatically

### Option 2: Manual Start
**Terminal 1 - Backend:**
```cmd
start.bat
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
python server.py
```

**Then open:** http://localhost:8080/

### Option 3: Traditional Method
**Terminal 1:**
```cmd
python manage.py runserver
```

**Terminal 2:**
```cmd
cd frontend
python -m http.server 8080
```

---

## 📋 Prerequisites

- Python 3.8+
- pip (Python package manager)
- Modern web browser

---

## 🔧 Installation

### 1. Clone/Download Project
```cmd
cd e:\TODO
```

### 2. Install Dependencies
```cmd
pip install -r requirements.txt
```

### 3. Setup Database
```cmd
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Admin (Optional)
```cmd
python manage.py createsuperuser
```

### 5. Run Application
```cmd
start_all.bat
```

---

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Landing Page** | http://localhost:8080/ | Home page |
| **Auth Page** | http://localhost:8080/auth | Login/Register |
| **Todo App** | http://localhost:8080/app | Main application |
| **Backend API** | http://localhost:8000/api | REST API |
| **Admin Panel** | http://localhost:8000/admin | Django admin |

---

## 📱 User Flow

```
Landing Page (/)
    ↓ Click "Get Started"
Auth Page (/auth)
    ↓ Register/Login
Todo App (/app)
    ↓ Add, Complete, Delete Todos
    ↓ Click Logout
Back to Landing Page
```

---

## 🎨 Themes

- ☀️ **Light** - Clean and professional
- 🌙 **Dark** - Easy on the eyes
- 🧁 **Cupcake** - Sweet and colorful
- 🌲 **Forest** - Nature-inspired

Theme persists across all pages!

---

## 📁 Project Structure

```
TODO/
├── frontend/
│   ├── index.html          # Landing page
│   ├── auth.html           # Login/Register
│   ├── app.html            # Todo app
│   ├── script.js           # App logic
│   ├── auth.js             # Auth logic
│   ├── auth_styles.css     # Styles
│   ├── server.py           # Custom server
│   └── start_frontend.bat  # Frontend launcher
│
├── todos/
│   ├── models.py           # Todo model
│   ├── views.py            # API views
│   ├── auth_views.py       # Auth endpoints
│   └── urls.py             # URL routing
│
├── todoproject/
│   ├── settings.py         # Django config
│   └── urls.py             # Main routing
│
├── start.bat               # Backend launcher
├── start_all.bat           # One-click launcher
├── requirements.txt        # Dependencies
└── README.md               # This file
```

---

## 🔐 API Endpoints

### Authentication (Public)
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh token

### Todos (Protected)
- `GET /api/todos/` - Get user's todos
- `POST /api/todos/create/` - Create todo
- `PUT /api/todos/<id>/finish/` - Mark finished
- `PUT /api/todos/<id>/unfinish/` - Mark unfinished
- `DELETE /api/todos/<id>/delete/` - Delete todo

All protected endpoints require JWT token in header:
```
Authorization: Bearer <access_token>
```

---

## 🛠️ Technologies Used

### Backend
- Django 4.2.7
- Django REST Framework
- Simple JWT
- SQLite

### Frontend
- HTML5
- JavaScript (ES6+)
- TailwindCSS
- DaisyUI
- Heroicons

---

## 🐛 Troubleshooting

### Issue: "Module not found"
```cmd
pip install -r requirements.txt
```

### Issue: "Port already in use"
```cmd
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue: "Database error"
```cmd
python manage.py migrate
```

### Issue: "Can't login"
- Clear browser cache and localStorage
- Check if backend is running
- Verify credentials

---

## 📊 Features Checklist

✅ User registration & login  
✅ JWT authentication  
✅ User-specific todos  
✅ Add/Edit/Delete todos  
✅ Mark todos complete/incomplete  
✅ Multiple themes  
✅ Theme persistence  
✅ Responsive design  
✅ Landing page  
✅ Split-screen auth UI  
✅ Smooth animations  
✅ Favicon  
✅ Footer positioning  
✅ Professional workflow  
✅ One-click startup  
✅ Custom server  
✅ Proper routing  

---

## 🚀 Deployment

See `GITHUB_DEPLOYMENT.md` for deployment instructions to:
- Railway
- Render
- Heroku
- Vercel (Frontend)
- Netlify (Frontend)

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects

---

## 👨‍💻 Author

**Gokul**

---

## 🙏 Acknowledgments

- Django Team
- TailwindCSS Team
- DaisyUI Team
- Heroicons

---

## 📞 Support

Having issues? Check:
1. This README
2. `SETUP_INSTRUCTIONS.md`
3. `FINAL_FIXES.md`
4. `TROUBLESHOOTING.md`

---

**Made with ❤️ by Gokul**

*Professional. Modern. Production-Ready.* 🚀lication

A modern, full-stack Todo List application built with Django backend and vanilla JavaScript frontend.

## Features

✨ **Core Functionality**
- ✅ Create, Read, Update, Delete (CRUD) todos
- ✅ Mark todos as finished/unfinished
- ✅ Automatic timestamp tracking (created & finished times)
- ✅ Todos grouped by date (Today, Yesterday, specific dates)
- ✅ Real-time statistics (Total, Completed, Pending)

🎨 **Modern UI**
- Responsive design with TailwindCSS & DaisyUI
- Multiple theme support (Light, Dark, Cupcake, Forest)
- Smooth animations and transitions
- Clean, intuitive interface
- Visual indicators for completed todos

🏗️ **Architecture**
- RESTful API with Django
- SQLite database (development)
- PostgreSQL ready (production)
- User support ready (commented in model)
- CORS enabled for API access

## Tech Stack

**Backend:**
- Django 4.2.7
- Django CORS Headers
- SQLite (dev) / PostgreSQL (prod)

**Frontend:**
- HTML5
- TailwindCSS (CDN)
- DaisyUI (CDN)
- Vanilla JavaScript (ES6+)

## Project Structure

```
TODO/
├── todoproject/          # Django project settings
│   ├── __init__.py
│   ├── settings.py      # Project configuration
│   ├── urls.py          # Main URL routing
│   ├── wsgi.py
│   └── asgi.py
├── todos/               # Django app for todos
│   ├── __init__.py
│   ├── models.py        # Todo model with timestamps
│   ├── views.py         # API views (JSON responses)
│   ├── urls.py          # API URL patterns
│   └── admin.py         # Admin interface config
├── frontend/            # Frontend files
│   ├── index.html       # Main HTML file
│   └── script.js        # JavaScript logic
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- pip

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Database Setup

```bash
# Create database tables
python manage.py makemigrations
python manage.py migrate

# (Optional) Create admin user
python manage.py createsuperuser
```

### Step 3: Run Development Server

```bash
python manage.py runserver
```

The Django API will be available at `http://localhost:8000`

### Step 4: Open Frontend

Open `frontend/index.html` in your browser, or serve it with a simple HTTP server:

```bash
# Using Python
cd frontend
python -m http.server 8080
```

Then visit `http://localhost:8080`

## API Endpoints

All endpoints are prefixed with `/api/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos/` | Get all todos |
| POST | `/api/todos/create/` | Create a new todo |
| GET | `/api/todos/<id>/` | Get a specific todo |
| PUT | `/api/todos/<id>/finish/` | Mark todo as finished |
| PUT | `/api/todos/<id>/unfinish/` | Mark todo as unfinished |
| DELETE | `/api/todos/<id>/delete/` | Delete a todo |

### Example API Requests

**Create Todo:**
```bash
curl -X POST http://localhost:8000/api/todos/create/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'
```

**Get All Todos:**
```bash
curl http://localhost:8000/api/todos/
```

**Mark as Finished:**
```bash
curl -X PUT http://localhost:8000/api/todos/1/finish/
```

**Delete Todo:**
```bash
curl -X DELETE http://localhost:8000/api/todos/1/delete/
```

## Database Schema

### Todo Model

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key (auto) |
| text | TextField | Todo item text |
| is_finished | Boolean | Completion status |
| created_at | DateTime | Creation timestamp (auto) |
| finished_at | DateTime | Completion timestamp (nullable) |

## Features in Detail

### Date Grouping
Todos are automatically grouped by their creation date:
- **Today** - Todos created today
- **Yesterday** - Todos created yesterday
- **Specific Date** - Older todos shown with full date

### Timestamp Display
- **Created time**: Shows when the todo was added
- **Finished time**: Shows when the todo was completed (only for finished todos)
- Format: "Mon DD, YYYY HH:MM AM/PM"

### Theme Support
Users can switch between multiple themes:
- Light (default)
- Dark
- Cupcake
- Forest

Theme preference is saved in localStorage.

### Statistics Dashboard
Real-time counters showing:
- Total number of todos
- Completed todos count
- Pending todos count

## Future Enhancements (Ready to Implement)

### User Authentication
The model is designed to support user association. Uncomment this line in `todos/models.py`:

```python
user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='todos')
```

Then add authentication views and update the API to filter by user.

### Deployment to Production

**Database Migration:**
Update `settings.py` to use PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

**Security Settings:**
```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
SECRET_KEY = 'your-secure-secret-key'
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = ['https://yourdomain.com']
```

**Static Files:**
```bash
python manage.py collectstatic
```

## Development Tips

### Django Admin
Access the admin panel at `http://localhost:8000/admin/` to manage todos directly.

### CORS Issues
If you encounter CORS errors, ensure:
1. `django-cors-headers` is installed
2. `corsheaders` is in `INSTALLED_APPS`
3. `CorsMiddleware` is in `MIDDLEWARE`
4. Frontend is accessing the correct API URL

### Database Reset
To start fresh:
```bash
python manage.py flush
```

## Testing

### Manual Testing Checklist
- [ ] Add a new todo
- [ ] Mark todo as finished
- [ ] Unmark finished todo
- [ ] Delete a todo
- [ ] Check timestamps display correctly
- [ ] Verify date grouping works
- [ ] Test theme switching
- [ ] Check responsive design on mobile
- [ ] Verify statistics update correctly

### API Testing
Use the Django admin or tools like Postman/Insomnia to test API endpoints.

## Troubleshooting

**Issue: Frontend can't connect to backend**
- Ensure Django server is running on port 8000
- Check browser console for CORS errors
- Verify API_BASE_URL in script.js matches your Django server

**Issue: Database errors**
- Run migrations: `python manage.py migrate`
- Check if db.sqlite3 file has proper permissions

**Issue: Static files not loading**
- For development, Django serves static files automatically
- For production, configure a proper static file server

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork, modify, and submit pull requests!

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Django, TailwindCSS, and DaisyUI
