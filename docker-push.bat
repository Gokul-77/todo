@echo off
title Docker Push - Todo App
color 0C
echo.
echo ============================================================
echo          Pushing Docker Images to Docker Hub
echo ============================================================
echo.
echo Docker Username: enfielder
echo.
echo Make sure you're logged in to Docker Hub!
echo Run: docker login
echo.
pause
echo.
echo Pushing backend image...
docker push enfielder/todo-backend:latest
echo.
echo Pushing frontend image...
docker push enfielder/todo-frontend:latest
echo.
echo ============================================================
echo          Push Complete!
echo ============================================================
echo.
echo Images available at:
echo   - hub.docker.com/r/enfielder/todo-backend
echo   - hub.docker.com/r/enfielder/todo-frontend
echo.
echo To pull and run:
echo   docker pull enfielder/todo-backend:latest
echo   docker pull enfielder/todo-frontend:latest
echo   docker-compose up
echo.
pause
