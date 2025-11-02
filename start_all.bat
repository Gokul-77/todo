@echo off
title Todo List - Launcher
color 0E
cls
echo.
echo ============================================================
echo              Todo List App - Launcher
echo ============================================================
echo.
echo This will start both Backend and Frontend servers...
echo.
echo Starting Backend Server...
start "Todo Backend" cmd /k "cd /d %~dp0 && start.bat"
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Todo Frontend" cmd /k "cd /d %~dp0frontend && start_frontend.bat"
timeout /t 2 /nobreak >nul

echo.
echo ============================================================
echo   Both servers are starting in separate windows!
echo ============================================================
echo.
echo   Backend:  http://localhost:8000/
echo   Frontend: http://localhost:8080/
echo.
echo   Opening browser in 3 seconds...
echo ============================================================
timeout /t 3 /nobreak >nul

start http://localhost:8080/

echo.
echo Browser opened! You can close this window.
echo.
timeout /t 2 /nobreak >nul
exit
