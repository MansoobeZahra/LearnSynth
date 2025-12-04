🏁 Multi-Model Race - Quick Start Guide

## Install Dependencies
```bash
pip install openai aiohttp
```

## Start Backend
```bash
python backend/main.py
```

You should see:
```
🚀 Starting Multi-Model Race Server...
   Gemini: ✓ Enabled
   Grok:   ✓ Enabled
INFO:     Uvicorn running on http://0.0.0.0:8001
```

## Start Frontend
```bash
cd frontend
npm run dev
```

## How It Works
1. Upload a file (Image, Video, Audio, or Text)
2. Ask a question
3. Both Gemini and Grok race to answer
4. First response wins! 🏆
5. You'll see which model won with a colored badge

## What's Different
- Files upload INSTANTLY (no more hanging!)
- Both AI models compete for speed
- You get the fastest possible answer
- Terminal shows which model is winning

Enjoy! 🚀
