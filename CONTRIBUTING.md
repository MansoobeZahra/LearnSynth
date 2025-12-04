# Contributing to LearnSynth AI

Thank you for your interest in contributing to LearnSynth AI! 🎉

## How to Contribute

### Reporting Bugs 🐛

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Python version, Node version)

### Suggesting Features 💡

We love new ideas! Open an issue with:
- A clear description of the feature
- Why it would be useful
- Possible implementation approach

### Pull Requests 🔧

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/learnsynth-ai.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Ensure backend runs: `python backend/main.py`
   - Ensure frontend runs: `cd frontend && npm run dev`
   - Test the feature thoroughly

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe what you changed and why
   - Reference any related issues

## Development Setup

### Backend
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux
pip install -r backend/requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Code Style

### Python
- Follow PEP 8
- Use type hints where possible
- Add docstrings for functions

### JavaScript/React
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful variable names

## Questions?

Feel free to open an issue for any questions or clarifications!

---

**Thank you for contributing! 🙏**
