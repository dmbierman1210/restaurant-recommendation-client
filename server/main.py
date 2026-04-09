
from fastapi import FastAPI
from pathlib import Path
import sys
sys.path.append(str(Path(__file__).parent))
from init_db import init_db

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def read_root():
    return {"message": "Restaurant Recommendation Server is running!"}
