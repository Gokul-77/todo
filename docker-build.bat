@echo off
title Docker Build - Todo App
color 0B
echo.
echo ============================================================
echo          Building Docker Images
echo ============================================================
echo.
echo Docker Username: enfielder
echo.
echo Building backend image...
docker build -t enfielder/todo-backend:latest .
echo.
echo Building frontend image...
docker build -t enfielder/todo-frontend:latest ./frontend
echo.
echo ============================================================
echo          Build Complete!
echo ============================================================
echo.
echo Images created:
echo   - enfielder/todo-backend:latest
echo   - enfielder/todo-frontend:latest
echo.
echo Next steps:
echo   1. Run: docker-compose up
echo   2. Or push: docker-push.bat
echo.
pause
