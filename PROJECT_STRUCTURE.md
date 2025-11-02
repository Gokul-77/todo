# Project Structure

Complete overview of the Todo List application architecture.

## 📁 Directory Structure

```
TODO/
├── 📂 todoproject/              # Django project configuration
│   ├── __init__.py
│   ├── settings.py             # Main settings (DB, CORS, apps)
│   ├── urls.py                 # Root URL configuration
│   ├── wsgi.py                 # WSGI server entry point
│   └── asgi.py                 # ASGI server entry point
│
├── 📂 todos/                    # Main Django app
│   ├── 📂 migrations/          # Database migrations
│   │   ├── __init__.py
│   │   └── 0001_initial.py    # Initial Todo model migration
│   ├── __init__.py
│   ├── models.py               # Todo model with timestamps
│   ├── views.py                # API views (CRUD operations)
│   ├── urls.py                 # API URL patterns
│   ├── admin.py                # Admin panel configuration
│   └── tests.py                # Unit tests for model & API
│
├── 📂 frontend/                 # Frontend application
│   ├── index.html              # Main HTML with UI components
│   └── script.js               # JavaScript (API calls, rendering)
│
├── 📄 manage.py                 # Django management script
├── 📄 requirements.txt          # Python dependencies
├── 📄 .gitignore               # Git ignore rules
├── 📄 .env.example             # Environment variables template
│
├── 📄 README.md                # Main documentation
├── 📄 QUICKSTART.md            # Quick start guide
├── 📄 DEPLOYMENT.md            # Production deployment guide
├── 📄 PROJECT_STRUCTURE.md     # This file
│
├── 📄 start.bat                # Windows quick start script
└── 📄 test.bat                 # Windows test runner script
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  index.html (UI)                                       │ │
│  │  - TailwindCSS + DaisyUI styling                      │ │
│  │  - Responsive layout                                   │ │
│  │  - Theme switcher                                      │ │
│  │  - Stats dashboard                                     │ │
│  │  - Todo list with date grouping                       │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  script.js (Logic)                                     │ │
│  │  - Fetch API calls                                     │ │
│  │  - DOM manipulation                                    │ │
│  │  - Date grouping logic                                 │ │
│  │  - Theme management                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Django Backend                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  URLs (todoproject/urls.py + todos/urls.py)           │ │
│  │  - /api/todos/                 → get_todos            │ │
│  │  - /api/todos/create/          → create_todo          │ │
│  │  - /api/todos/<id>/            → get_todo             │ │
│  │  - /api/todos/<id>/finish/     → finish_todo          │ │
│  │  - /api/todos/<id>/unfinish/   → unfinish_todo        │ │
│  │  - /api/todos/<id>/delete/     → delete_todo          │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Views (todos/views.py)                               │ │
│  │  - JSON responses                                      │ │
│  │  - Error handling                                      │ │
│  │  - CRUD operations                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Models (todos/models.py)                             │ │
│  │  - Todo model                                          │ │
│  │  - Timestamp fields                                    │ │
│  │  - Status tracking                                     │ │
│  │  - to_dict() serialization                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Database                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SQLite (Development)                                  │ │
│  │  PostgreSQL (Production)                               │ │
│  │                                                         │ │
│  │  Todo Table:                                           │ │
│  │  - id (PK)                                             │ │
│  │  - text                                                │ │
│  │  - is_finished                                         │ │
│  │  - created_at                                          │ │
│  │  - finished_at                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Creating a Todo

```
User Input → JavaScript → POST /api/todos/create/
                              ↓
                         Django View (create_todo)
                              ↓
                         Todo.objects.create()
                              ↓
                         Database INSERT
                              ↓
                         JSON Response
                              ↓
                         JavaScript updates UI
```

### Marking Todo as Finished

```
Checkbox Click → JavaScript → PUT /api/todos/<id>/finish/
                                   ↓
                              Django View (finish_todo)
                                   ↓
                              Todo.objects.get(id)
                                   ↓
                              Set is_finished=True
                              Set finished_at=now()
                                   ↓
                              Database UPDATE
                                   ↓
                              JSON Response
                                   ↓
                              JavaScript updates UI
```

### Loading Todos

```
Page Load → JavaScript → GET /api/todos/
                             ↓
                        Django View (get_todos)
                             ↓
                        Todo.objects.all()
                             ↓
                        Database SELECT
                             ↓
                        JSON Response (array)
                             ↓
                        JavaScript groups by date
                             ↓
                        Render UI with date sections
```

## 🗄️ Database Schema

### Todo Model

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BigInteger | PK, Auto | Primary key |
| `text` | Text | Required | Todo item content |
| `is_finished` | Boolean | Default: False | Completion status |
| `created_at` | DateTime | Auto, Indexed | Creation timestamp |
| `finished_at` | DateTime | Nullable, Optional | Completion timestamp |

**Indexes:**
- `created_at` (DESC) - For date grouping
- `is_finished` - For filtering

**Future Field (Commented):**
- `user` - ForeignKey to User model (for multi-user support)

## 🔌 API Endpoints

### GET /api/todos/
**Purpose**: Retrieve all todos  
**Response**: 
```json
{
  "success": true,
  "todos": [...],
  "count": 5
}
```

### POST /api/todos/create/
**Purpose**: Create new todo  
**Body**: `{"text": "Todo text"}`  
**Response**: 
```json
{
  "success": true,
  "todo": {...},
  "message": "Todo created successfully"
}
```

### GET /api/todos/<id>/
**Purpose**: Get single todo  
**Response**: 
```json
{
  "success": true,
  "todo": {...}
}
```

### PUT /api/todos/<id>/finish/
**Purpose**: Mark todo as finished  
**Response**: 
```json
{
  "success": true,
  "todo": {...},
  "message": "Todo marked as finished"
}
```

### PUT /api/todos/<id>/unfinish/
**Purpose**: Mark todo as unfinished  
**Response**: 
```json
{
  "success": true,
  "todo": {...},
  "message": "Todo marked as unfinished"
}
```

### DELETE /api/todos/<id>/delete/
**Purpose**: Delete todo  
**Response**: 
```json
{
  "success": true,
  "todo": {...},
  "message": "Todo deleted successfully"
}
```

## 🎨 Frontend Components

### HTML Structure

```html
- Navbar
  ├── App Title
  └── Theme Switcher
  
- Stats Dashboard
  ├── Total Count
  ├── Completed Count
  └── Pending Count
  
- Add Todo Form
  ├── Text Input
  └── Add Button
  
- Todos Container
  └── Date Groups
      ├── Date Header
      └── Todo Items
          ├── Checkbox
          ├── Text & Timestamps
          └── Delete Button
          
- Footer
```

### JavaScript Modules

```javascript
// API Functions
- loadTodos()
- handleAddTodo()
- toggleTodoStatus()
- deleteTodo()

// Rendering Functions
- renderTodos()
- groupTodosByDate()
- renderDateGroup()
- renderTodoItem()

// Utility Functions
- formatTime()
- escapeHtml()
- updateStats()

// UI Feedback
- showLoading()
- hideLoading()
- showError()
- showSuccess()

// Theme Management
- setTheme()
- loadTheme()
```

## 🔒 Security Features

### Backend
- CSRF protection (Django middleware)
- CORS configuration (django-cors-headers)
- SQL injection prevention (Django ORM)
- XSS prevention (Django templates)
- Input validation

### Frontend
- HTML escaping (escapeHtml function)
- Confirmation dialogs for destructive actions
- Error handling for failed requests

## 🧪 Testing

### Unit Tests (todos/tests.py)

**Model Tests:**
- Todo creation
- String representation
- to_dict() serialization
- Finish/unfinish logic

**API Tests:**
- GET all todos
- POST create todo
- GET single todo
- PUT finish/unfinish
- DELETE todo
- Error handling (404, 400)

**Run Tests:**
```bash
python manage.py test todos
```

## 🚀 Deployment Considerations

### Development
- SQLite database
- DEBUG = True
- CORS allow all origins
- Django dev server

### Production
- PostgreSQL database
- DEBUG = False
- Specific ALLOWED_HOSTS
- Gunicorn + Nginx
- SSL/HTTPS
- Static file serving
- Environment variables
- Database backups

## 📦 Dependencies

### Backend
- **Django 4.2.7**: Web framework
- **django-cors-headers 4.3.1**: CORS support

### Frontend
- **TailwindCSS**: Utility-first CSS (CDN)
- **DaisyUI**: Component library (CDN)
- **Vanilla JavaScript**: No framework dependencies

## 🔮 Future Enhancements

### Ready to Implement
1. **User Authentication**
   - Uncomment user field in model
   - Add login/register views
   - Filter todos by user

2. **Categories/Tags**
   - Add Category model
   - Many-to-many relationship
   - Filter by category

3. **Due Dates**
   - Add due_date field
   - Sort by due date
   - Overdue indicators

4. **Search & Filter**
   - Search by text
   - Filter by status
   - Filter by date range

5. **Bulk Operations**
   - Select multiple todos
   - Bulk delete
   - Bulk finish

### Advanced Features
- Real-time updates (WebSockets)
- Collaborative todos (shared lists)
- Recurring todos
- Subtasks
- File attachments
- Email notifications
- Mobile app (React Native)

## 📚 Learning Resources

### Django
- [Official Django Docs](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)

### Frontend
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Deployment
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [Gunicorn Docs](https://docs.gunicorn.org/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

This structure is designed for:
- ✅ Easy maintenance
- ✅ Clear separation of concerns
- ✅ Scalability
- ✅ Future feature additions
- ✅ Team collaboration
