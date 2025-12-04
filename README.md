#  LearnSynth AI - Intelligent Study Companion

<div align="center">

![LearnSynth AI](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google)

**A modern, multimodal AI study assistant that helps you learn from any content - images, videos, audio, and documents.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

##  Features

###  Multimodal Learning
-  **Image Analysis** - Analyze diagrams, charts, screenshots, and photos
-  **Video Summarization** - Extract key points from educational videos
-  **Audio Transcription** - Transcribe lectures and ask questions
-  **Document Processing** - PDFs, text files, code files, and more

###  Interactive Chat Interface
-  **Markdown Rendering** - Beautiful formatting with headings, lists, tables
-  **Syntax Highlighting** - Code blocks with language-specific colors
-  **Copy Functionality** - One-click copy for messages and code
-  **Dark Mode** - Easy on the eyes for late-night studying
-  **Smooth Animations** - Premium UI with gradient effects

###  Performance
- Fast response times with Gemini 2.5 Flash
- Async file processing for large videos
- Instant file uploads with drag & drop
- Real-time streaming responses

---

##  Demo

### Upload & Chat
1. Drag and drop any file (image, video, audio, PDF)
2. Ask questions about the content
3. Get detailed, formatted responses with code examples

### Supported File Types
- **Images**: `.jpg`, `.png`, `.gif`, `.webp`, `.bmp`
- **Videos**: `.mp4`, `.avi`, `.mov`, `.webm`
- **Audio**: `.mp3`, `.wav`, `.ogg`, `.m4a`
- **Documents**: `.pdf`, `.txt`, `.md`, `.csv`, `.html`, `.js`, `.py`

---

##  Installation

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Clone the Repository
```bash
git clone https://github.com/MansoobeZahra/learnsynth-ai.git
cd learnsynth-ai
```

### 2. Quick Setup (Recommended for Windows)
```bash
# Run the automated setup script
setup.bat
```
This will:
- Create `.env` file from template
- Install Python dependencies
- Install Node dependencies

Then edit `backend/.env` and add your Gemini API key.

### 3. Manual Setup

#### Backend
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Create .env file
cd backend
echo GEMINI_API_KEY=your_api_key_here > .env
```

#### Frontend
```bash
cd frontend
npm install
```

---

##  Usage

### Start the Application

**Option 1: Using the Quick Start Script (Windows)**
```bash
# Start backend
start_backend.bat

# In a new terminal, start frontend
cd frontend
npm run dev
```

**Option 2: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🛠️ Tech Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** - Multimodal AI model
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server
- **[python-dotenv](https://pypi.org/project/python-dotenv/)** - Environment management

### Frontend
- **[React 19](https://react.dev/)** - UI library
- **[Vite 7](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Lucide React](https://lucide.dev/)** - Icon library

---

##  Project Structure

```
learnsynth-ai/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # API keys (not in git)
│   └── uploads/             # Uploaded files (not in git)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application
│   │   ├── api.js           # API client
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx
│   │   │   └── FileUpload.jsx
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
├── .gitignore
├── README.md
└── start_backend.bat        # Quick start script
```

---

##  Configuration

### Environment Variables

**Backend** (`backend/.env`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend** (`frontend/.env` - optional):
```env
VITE_API_URL=http://localhost:8001
```

---

##  API Endpoints

### `POST /api/chat`
Send a message with optional file attachment.

**Request:**
- `message` (form-data): User's question
- `file` (form-data, optional): File to analyze

**Response:**
```json
{
  "response": "AI's detailed answer...",
  "model": "AI Assistant"
}
```

---

##  UI Features

### Chat Interface
- **Gradient Message Bubbles** - Purple-to-pink for AI, gray for user
- **Markdown Support** - Headings, lists, tables, blockquotes, links
- **Code Blocks** - Syntax highlighting with copy buttons
- **Responsive Design** - Works on all screen sizes
- **Smooth Animations** - Framer Motion powered transitions

### File Upload
- **Drag & Drop** - Intuitive file selection
- **Type-Specific Icons** - Visual feedback for different file types
- **File Preview** - See selected file details
- **Quick Clear** - Remove file with one click

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- **Google Gemini** for the powerful multimodal AI
- **FastAPI** for the excellent Python framework
- **React** and **Vite** for the modern frontend stack
- **Tailwind CSS** for beautiful, utility-first styling

---

##  Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with Love and Efforts**

 Star this repo if you find it helpful!

</div>
