@echo off
echo ========================================
echo   LearnSynth AI - Quick Setup
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [1/3] Creating .env file from template...
    copy "backend\.env.example" "backend\.env"
    echo.
    echo IMPORTANT: Please edit backend\.env and add your GEMINI_API_KEY
    echo Get your API key from: https://aistudio.google.com/app/apikey
    echo.
    pause
) else (
    echo [1/3] .env file already exists
)

REM Install Python dependencies
echo.
echo [2/3] Installing Python dependencies...
pip install -r backend\requirements.txt

REM Install Node dependencies
echo.
echo [3/3] Installing Node dependencies...
cd frontend
call npm install
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env and add your GEMINI_API_KEY
echo 2. Run start_backend.bat to start the backend
echo 3. Run 'cd frontend && npm run dev' to start the frontend
echo.
pause
