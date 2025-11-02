# API Reference

Complete API documentation for the Todo List application.

## Base URL

```
http://localhost:8000/api
```

For production, replace with your domain:
```
https://yourdomain.com/api
```

---

## Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/todos/` | Get all todos | No |
| POST | `/todos/create/` | Create a new todo | No |
| GET | `/todos/<id>/` | Get a specific todo | No |
| PUT | `/todos/<id>/finish/` | Mark todo as finished | No |
| PUT | `/todos/<id>/unfinish/` | Mark todo as unfinished | No |
| DELETE | `/todos/<id>/delete/` | Delete a todo | No |

---

## 1. Get All Todos

Retrieve all todos ordered by creation date (newest first).

### Request

```http
GET /api/todos/
```

### Response

**Success (200 OK)**
```json
{
  "success": true,
  "todos": [
    {
      "id": 1,
      "text": "Buy groceries",
      "is_finished": false,
      "created_at": "2024-11-02T06:30:00.000Z",
      "finished_at": null
    },
    {
      "id": 2,
      "text": "Complete project",
      "is_finished": true,
      "created_at": "2024-11-01T10:15:00.000Z",
      "finished_at": "2024-11-01T18:45:00.000Z"
    }
  ],
  "count": 2
}
```

**Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl http://localhost:8000/api/todos/
```

```javascript
fetch('http://localhost:8000/api/todos/')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 2. Create Todo

Create a new todo item.

### Request

```http
POST /api/todos/create/
Content-Type: application/json
```

**Body**
```json
{
  "text": "Todo item text"
}
```

### Response

**Success (201 Created)**
```json
{
  "success": true,
  "todo": {
    "id": 3,
    "text": "Buy groceries",
    "is_finished": false,
    "created_at": "2024-11-02T06:30:00.000Z",
    "finished_at": null
  },
  "message": "Todo created successfully"
}
```

**Error - Empty Text (400 Bad Request)**
```json
{
  "success": false,
  "error": "Todo text is required"
}
```

**Error - Invalid JSON (400 Bad Request)**
```json
{
  "success": false,
  "error": "Invalid JSON"
}
```

**Error - Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl -X POST http://localhost:8000/api/todos/create/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'
```

```javascript
fetch('http://localhost:8000/api/todos/create/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: 'Buy groceries' })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 3. Get Single Todo

Retrieve a specific todo by ID.

### Request

```http
GET /api/todos/<id>/
```

**Parameters**
- `id` (integer, required) - Todo ID

### Response

**Success (200 OK)**
```json
{
  "success": true,
  "todo": {
    "id": 1,
    "text": "Buy groceries",
    "is_finished": false,
    "created_at": "2024-11-02T06:30:00.000Z",
    "finished_at": null
  }
}
```

**Error - Not Found (404 Not Found)**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Error - Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl http://localhost:8000/api/todos/1/
```

```javascript
fetch('http://localhost:8000/api/todos/1/')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 4. Mark Todo as Finished

Mark a todo as completed and record the finished timestamp.

### Request

```http
PUT /api/todos/<id>/finish/
```

**Parameters**
- `id` (integer, required) - Todo ID

### Response

**Success (200 OK)**
```json
{
  "success": true,
  "todo": {
    "id": 1,
    "text": "Buy groceries",
    "is_finished": true,
    "created_at": "2024-11-02T06:30:00.000Z",
    "finished_at": "2024-11-02T08:15:00.000Z"
  },
  "message": "Todo marked as finished"
}
```

**Error - Already Finished (400 Bad Request)**
```json
{
  "success": false,
  "error": "Todo is already finished"
}
```

**Error - Not Found (404 Not Found)**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Error - Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl -X PUT http://localhost:8000/api/todos/1/finish/
```

```javascript
fetch('http://localhost:8000/api/todos/1/finish/', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 5. Mark Todo as Unfinished

Mark a todo as incomplete and clear the finished timestamp.

### Request

```http
PUT /api/todos/<id>/unfinish/
```

**Parameters**
- `id` (integer, required) - Todo ID

### Response

**Success (200 OK)**
```json
{
  "success": true,
  "todo": {
    "id": 1,
    "text": "Buy groceries",
    "is_finished": false,
    "created_at": "2024-11-02T06:30:00.000Z",
    "finished_at": null
  },
  "message": "Todo marked as unfinished"
}
```

**Error - Already Unfinished (400 Bad Request)**
```json
{
  "success": false,
  "error": "Todo is already unfinished"
}
```

**Error - Not Found (404 Not Found)**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Error - Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl -X PUT http://localhost:8000/api/todos/1/unfinish/
```

```javascript
fetch('http://localhost:8000/api/todos/1/unfinish/', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 6. Delete Todo

Delete a todo permanently.

### Request

```http
DELETE /api/todos/<id>/delete/
```

**Parameters**
- `id` (integer, required) - Todo ID

### Response

**Success (200 OK)**
```json
{
  "success": true,
  "todo": {
    "id": 1,
    "text": "Buy groceries",
    "is_finished": false,
    "created_at": "2024-11-02T06:30:00.000Z",
    "finished_at": null
  },
  "message": "Todo deleted successfully"
}
```

**Error - Not Found (404 Not Found)**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Error - Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Example

```bash
curl -X DELETE http://localhost:8000/api/todos/1/delete/
```

```javascript
fetch('http://localhost:8000/api/todos/1/delete/', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Data Models

### Todo Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier (auto-generated) |
| `text` | string | Todo item text content |
| `is_finished` | boolean | Completion status (true/false) |
| `created_at` | string (ISO 8601) | Creation timestamp |
| `finished_at` | string (ISO 8601) or null | Completion timestamp (null if not finished) |

**Example**
```json
{
  "id": 1,
  "text": "Buy groceries",
  "is_finished": true,
  "created_at": "2024-11-02T06:30:00.000Z",
  "finished_at": "2024-11-02T08:15:00.000Z"
}
```

---

## Response Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or state |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Errors

**Empty Todo Text**
```json
{
  "success": false,
  "error": "Todo text is required"
}
```

**Invalid JSON**
```json
{
  "success": false,
  "error": "Invalid JSON"
}
```

**Todo Not Found**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Already Finished**
```json
{
  "success": false,
  "error": "Todo is already finished"
}
```

**Already Unfinished**
```json
{
  "success": false,
  "error": "Todo is already unfinished"
}
```

---

## CORS Configuration

The API is configured to allow cross-origin requests from any origin in development.

**Development:**
- `CORS_ALLOW_ALL_ORIGINS = True`

**Production:**
Update `settings.py`:
```python
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'https://yourdomain.com',
]
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider adding:

```bash
pip install django-ratelimit
```

Example usage:
```python
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='100/h')
def get_todos(request):
    # ... view code
```

---

## Authentication

Currently, the API does not require authentication. All endpoints are public.

### Adding Authentication (Future)

To add user authentication:

1. **Uncomment user field in model:**
```python
user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
```

2. **Add authentication to views:**
```python
from django.contrib.auth.decorators import login_required

@login_required
def get_todos(request):
    todos = Todo.objects.filter(user=request.user)
    # ...
```

3. **Update frontend to send auth tokens:**
```javascript
fetch('http://localhost:8000/api/todos/', {
  headers: {
    'Authorization': 'Token ' + authToken
  }
})
```

---

## Testing the API

### Using cURL

**Get all todos:**
```bash
curl http://localhost:8000/api/todos/
```

**Create todo:**
```bash
curl -X POST http://localhost:8000/api/todos/create/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Test todo"}'
```

**Mark as finished:**
```bash
curl -X PUT http://localhost:8000/api/todos/1/finish/
```

**Delete todo:**
```bash
curl -X DELETE http://localhost:8000/api/todos/1/delete/
```

### Using Python

```python
import requests

# Get all todos
response = requests.get('http://localhost:8000/api/todos/')
print(response.json())

# Create todo
response = requests.post(
    'http://localhost:8000/api/todos/create/',
    json={'text': 'Test todo'}
)
print(response.json())

# Mark as finished
response = requests.put('http://localhost:8000/api/todos/1/finish/')
print(response.json())

# Delete todo
response = requests.delete('http://localhost:8000/api/todos/1/delete/')
print(response.json())
```

### Using JavaScript (Fetch)

```javascript
// Get all todos
fetch('http://localhost:8000/api/todos/')
  .then(res => res.json())
  .then(data => console.log(data));

// Create todo
fetch('http://localhost:8000/api/todos/create/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Test todo' })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Mark as finished
fetch('http://localhost:8000/api/todos/1/finish/', {
  method: 'PUT'
})
  .then(res => res.json())
  .then(data => console.log(data));

// Delete todo
fetch('http://localhost:8000/api/todos/1/delete/', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Best Practices

### Client-Side

1. **Always check success field:**
```javascript
if (data.success) {
  // Handle success
} else {
  // Handle error
  console.error(data.error);
}
```

2. **Handle network errors:**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  // ...
} catch (error) {
  console.error('Network error:', error);
}
```

3. **Show user feedback:**
```javascript
// Show loading state
// Make request
// Show success/error message
```

### Server-Side

1. **Validate input:**
```python
if not text:
    return JsonResponse({
        'success': False,
        'error': 'Todo text is required'
    }, status=400)
```

2. **Handle exceptions:**
```python
try:
    # ... operation
except Exception as e:
    return JsonResponse({
        'success': False,
        'error': str(e)
    }, status=500)
```

3. **Use appropriate status codes:**
- 200 for successful GET/PUT/DELETE
- 201 for successful POST (creation)
- 400 for client errors
- 404 for not found
- 500 for server errors

---

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- CRUD operations for todos
- Timestamp tracking
- No authentication required

### Future Versions
- v1.1.0: Add user authentication
- v1.2.0: Add pagination
- v1.3.0: Add filtering and search
- v2.0.0: Add categories and tags

---

## Support

For issues or questions:
1. Check this documentation
2. Review the README.md
3. Check Django server logs
4. Inspect browser console for errors

---

*Last updated: November 2, 2024*
