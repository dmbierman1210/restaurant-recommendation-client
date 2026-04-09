# Restaurant Recommendation Client

This is the frontend React application for the Restaurant Recommendation project.

## Getting Started

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

The app will run at http://localhost:3000

---

# Restaurant Recommendation Server

This is the backend FastAPI application for the Restaurant Recommendation project.

## Getting Started

1. Create and activate the virtual environment:
   ```bash
   cd server
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will run at http://localhost:8000

---

For more details, see the ROADMAP.md file.
