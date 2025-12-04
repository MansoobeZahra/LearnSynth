import os
import asyncio
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import shutil
from pathlib import Path

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
gemini_key = os.getenv("GEMINI_API_KEY")
if gemini_key:
    genai.configure(api_key=gemini_key)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def root():
    return {"message": "Educational VLM API - Powered by Gemini 🔵"}

@app.post("/api/chat")
async def chat_endpoint(
    message: str = Form(...),
    file: UploadFile = File(None)
):
    try:
        print(f"\n🔵 Gemini: Processing request...")
        model = genai.GenerativeModel('gemini-2.5-flash')
        content_parts = []
        
        if file:
            # Save file locally
            file_path = UPLOAD_DIR / file.filename
            print(f"📁 Saving file: {file.filename}")
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Upload to Gemini (run in thread to avoid blocking)
            print(f"📤 Uploading to Gemini...")
            uploaded_file = await asyncio.to_thread(
                genai.upload_file,
                path=str(file_path),
                mime_type=file.content_type
            )
            
            # Wait for video processing if needed
            if file.content_type and file.content_type.startswith("video"):
                print("⏳ Waiting for video processing...")
                while uploaded_file.state.name == "PROCESSING":
                    await asyncio.sleep(2)
                    uploaded_file = await asyncio.to_thread(genai.get_file, uploaded_file.name)
            
            content_parts.append(uploaded_file)
            print(f"✓ File ready")

        content_parts.append(message)

        # Generate response (run in thread to avoid blocking)
        print(f"💭 Generating response...")
        response = await asyncio.to_thread(model.generate_content, content_parts)
        
        print(f"✓ Response received!\n")
        return {
            "response": response.text,
            "model": "AI Assistant"
        }

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Educational VLM Server...")
    print(f"   Gemini: {'✓ Enabled' if gemini_key else '✗ Disabled'}")
    print(f"   Port: 8001")
    uvicorn.run(app, host="0.0.0.0", port=8001)
