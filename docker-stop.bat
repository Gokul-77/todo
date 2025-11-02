@echo off
title Docker Stop - Todo App
color 0E
echo.
echo ============================================================
echo          Stopping Todo App
echo ============================================================
echo.
docker-compose down
echo.
echo ============================================================
echo          Containers Stopped!
echo ============================================================
echo.
pause
