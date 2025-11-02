@echo off
title Todo List - Backend Server
color 0A
echo.
echo ============================================================
echo          Todo List App - Backend Server
echo ============================================================
echo.
echo Starting Django backend server...
echo.
echo Backend API:  http://localhost:8000/api
echo Admin Panel:  http://localhost:8000/admin
echo.
echo IMPORTANT: Open another terminal and run:
echo   cd frontend
echo   python server.py
echo.
echo Then visit: http://localhost:8080/
echo.
echo Press Ctrl+C to stop the server
echo ============================================================
echo.
python manage.py runserver
