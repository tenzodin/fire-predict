# backend/main.py
import io, os, joblib, gdown, pandas as pd
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

MODEL_URL  = "https://drive.google.com/uc?id=16wAl33cNxgAHL3M68bxLrbPMe-_N1Mv_"
MODEL_PATH = "model.pkl"

app = FastAPI(title="FireSight API", version="0.1.0")

# ───────── CORS – allow your Vite dev-server & Render front end ─────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # during dev; restrict later
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────── on-start: download & load model ─────────
if not os.path.exists(MODEL_PATH):
    gdown.download(MODEL_URL, MODEL_PATH, quiet=False)

try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"❌ Could not load model: {e}")

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Accept a **single-row** CSV with the 8 weather columns
    and return the predicted number of fires next month.
    """
    try:
        df = pd.read_csv(io.BytesIO(await file.read()))
        pred = float(model.predict(df)[0])           # → Python float
        return {"predicted": pred}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
