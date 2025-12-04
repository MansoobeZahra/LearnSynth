@echo off
echo Stopping any existing backend processes...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *main.py*" 2>nul

echo.
echo Starting backend server on port 8001...
cd /d "%~dp0"
python backend/main.py
