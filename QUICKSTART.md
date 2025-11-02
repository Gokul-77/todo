# Quick Start Guide

Get your Todo List app running in 3 minutes!

## 🚀 Quick Setup (Windows)

### Option 1: Using the Start Script

Simply double-click `start.bat` and you're done! 🎉

### Option 2: Manual Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Setup database
python manage.py migrate

# 3. Start server
python manage.py runserver
```

## 🌐 Access the Application

1. **Backend API**: http://localhost:8000/api/todos/
2. **Admin Panel**: http://localhost:8000/admin/
3. **Frontend**: Open `frontend/index.html` in your browser

### Serving Frontend Properly

For better development experience, serve the frontend with:

```bash
cd frontend
python -m http.server 8080
```

Then visit: http://localhost:8080

## 📝 Create Admin User (Optional)

```bash
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

## ✅ Test the Application

```bash
# Run automated tests
python manage.py test todos

# Or use the test script
test.bat
```

## 🎨 Using the App

### Add a Todo
1. Type your todo in the input field
2. Click "Add" or press Enter
3. Todo appears in the "Today" section

### Complete a Todo
- Click the checkbox next to the todo
- It will be marked with a strikethrough
- Finished timestamp is recorded

### Delete a Todo
- Click the trash icon on the right
- Confirm deletion

### Change Theme
- Click the sun icon in the top-right
- Choose from Light, Dark, Cupcake, or Forest themes

## 🔧 Common Issues

### Issue: "Module not found" error
**Solution**: Install dependencies
```bash
pip install -r requirements.txt
```

### Issue: Frontend can't connect to backend
**Solution**: 
1. Make sure Django server is running on port 8000
2. Check that you're accessing the frontend via http:// (not file://)
3. Use `python -m http.server 8080` in the frontend folder

### Issue: Database errors
**Solution**: Run migrations
```bash
python manage.py migrate
```

### Issue: CORS errors in browser console
**Solution**: Already configured! Just make sure:
- Django server is running
- You're not using file:// protocol (use http://localhost:8080)

## 📚 API Examples

### Get all todos
```bash
curl http://localhost:8000/api/todos/
```

### Create a todo
```bash
curl -X POST http://localhost:8000/api/todos/create/ \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Buy groceries\"}"
```

### Mark as finished
```bash
curl -X PUT http://localhost:8000/api/todos/1/finish/
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8000/api/todos/1/delete/
```

## 🎯 Next Steps

- [ ] Explore the admin panel at http://localhost:8000/admin/
- [ ] Try different themes
- [ ] Add multiple todos and see date grouping
- [ ] Check out the API responses in browser DevTools
- [ ] Read README.md for detailed documentation
- [ ] Check DEPLOYMENT.md when ready to deploy

## 💡 Tips

- **Timestamps**: Both created and finished times are automatically tracked
- **Date Grouping**: Todos are grouped as "Today", "Yesterday", or by date
- **Stats**: Top dashboard shows total, completed, and pending counts
- **Responsive**: Works great on mobile devices too!
- **Themes**: Your theme preference is saved in browser

## 🆘 Need Help?

1. Check the browser console (F12) for errors
2. Check Django server output for API errors
3. Read the full README.md
4. Review the DEPLOYMENT.md for production setup

## 🎉 You're All Set!

Start adding todos and enjoy your new productivity tool!

---

**Pro Tip**: Keep the Django server running in one terminal and open another terminal for running commands.
