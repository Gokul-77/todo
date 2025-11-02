@echo off
echo ========================================
echo Todo List App - Complete Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
pip install -r requirements.txt
echo.

echo Step 2: Creating database migrations...
python manage.py makemigrations
echo.

echo Step 3: Running migrations...
python manage.py migrate
echo.

echo Step 4: Creating superuser (optional)...
echo You can skip this by pressing Ctrl+C
python manage.py createsuperuser
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the app:
echo 1. Run: start.bat (for backend)
echo 2. In another terminal: cd frontend ^&^& python -m http.server 8080
echo 3. Open http://localhost:8080/auth.html
echo.
pause
