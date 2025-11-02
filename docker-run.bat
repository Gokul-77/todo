@echo off
title Docker Run - Todo App
color 0A
echo.
echo ============================================================
echo          Starting Todo App with Docker Compose
echo ============================================================
echo.
echo Starting containers...
docker-compose up -d
echo.
echo Waiting for services to start...
timeout /t 5 /nobreak >nul
echo.
echo ============================================================
echo          Todo App is Running!
echo ============================================================
echo.
echo   Backend:  http://localhost:8000/
echo   Frontend: http://localhost:8080/
echo   API:      http://localhost:8000/api/
echo   Admin:    http://localhost:8000/admin/
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:8080/
echo.
echo To stop: docker-compose down
echo To view logs: docker-compose logs -f
echo.
pause
