# 🔥 Forest Fire Predictor

An AI-powered web app that predicts and visualizes wildfire risk across Ontario based on user-uploaded weather data.

---

## 🌍 What It Does

1. Upload a `.csv` file containing weather data for Ontario stations.
2. A machine learning model predicts wildfire occurrence **tiers** (Low / Moderate / High / Extreme) for the next month.
3. Results are visualized on an interactive Leaflet map with **color-coded markers** and a **visible legend**:
   - 🟢 Low Risk — Fewer than 50 fires — Routine local response
   - 🟡 Moderate — 50–150 fires — Regional resource prep
   - 🟠 High — 150–300 fires — Full deployment
   - 🔴 Extreme — Over 300 fires — National/international coordination
4. Each marker includes a **GPT-generated explanation and prevention tip**.

---

## 🚀 Tech Stack

| Tool/Library         | Usage                                |
|----------------------|----------------------------------------|
| 🧠 `scikit-learn`    | ML model (Random Forest Regressor)     |
| ⚙️ FastAPI (Python)  | Backend API                             |
| 🌐 React + Tailwind  | Frontend web app                       |
| 🗺️ React-Leaflet     | Interactive maps                        |
| 🤖 OpenAI GPT        | Natural language fire risk summaries    |
| ☁️ Vercel + Render   | Frontend and backend hosting            |

---

## 🧠 How It Works

<pre> ```mermaid graph TD A[User Uploads CSV] --> B[FastAPI Backend] B --> C[ML Model (.pkl)] C --> D[Predicted Fire Count] D --> E[Frontend Receives Prediction] E --> F[Animated Number Display] E --> G[Map Color Update] G --> H[CircleMarker Color & Tooltip] ``` </pre>

---

## 📁 Project Structure

```
forest-fire-predictor/
├── ml-model/              
│   ├── train_model.py
│   ├── merge_weather_fire.py
│   ├── forest_fire_merged.pkl
│   └── fire_counts_clean.csv
├── web-app/
│   ├── frontend/   # React + Tailwind + Leaflet
│   └── backend/    # FastAPI
│       ├── main.py
│       ├── model_loader.py
│       └── requirements.txt
├── README.md
```

---

## 📦 Getting Started

### 🔧 Backend (FastAPI)

```bash
cd web-app/backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🌐 Frontend (React)

```bash
cd web-app/frontend
npm install
npm run dev
```

> Set `.env` in `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

---

## 📁 Sample CSV Format

```csv
Station,TempMax,TempMin,TempMean,Precipitation,CoolingDegreeDays
Pickle Lake,32,5,18,65,45
Red Lake,30,6,17,70,50
Sioux Lookout,33,4,19,80,60
```

Each row = 1 Ontario station
📈 Output = wildfire tier + natural language explanation

---

## 🤖 Example GPT Explanation

> “This location is at **high risk** due to elevated temperatures (34°C), low humidity, and low rainfall. Avoid open flames and clear dry brush near your property.”

---

## 🗺️ Interactive Map Features

* Leaflet map renders all Ontario fire stations
* CircleMarkers color-coded by predicted fire count:

  * 🟢 0–49
  * 🟡 50–99
  * 🟠 100–149
  * 🔴 150+
* Hover tooltip shows station name + predicted fire count
* Legend explains color scale
* Smooth color fade transitions using CSS

---

## 📈 Fire Prediction Model

Trained with a **Random Forest Regressor** to predict monthly fire counts from historical weather.

### 🔢 Features

| Feature | Description           |
| ------- | --------------------- |
| Tm      | Mean Temperature (°C) |
| Tx      | Max Temperature (°C)  |
| Tn      | Min Temperature (°C)  |
| S       | Rainfall (mm)         |
| P       | Precipitation (mm)    |
| CDD     | Cooling Degree Days   |
| Month   | Weather month number  |
| Year    | Year of record        |

### 🔍 Prediction Output

A fire count (rounded) → Mapped to Risk Tier:

| Risk Tier   | Fires per Month | Response Level                    |
| ----------- | --------------- | --------------------------------- |
| 🟢 Low      | 0–49            | Routine local response            |
| 🟡 Moderate | 50–150          | Pre-position regional resources   |
| 🟠 High     | 150–300         | Full deployment                   |
| 🔴 Extreme  | Over 300        | National/international assistance |

---

## 🧪 Sample Model Usage

```python
import pandas as pd
import pickle

# Load model
with open("forest_fire_model_aggregated.pkl", "rb") as f:
    model = pickle.load(f)

# Predict
X_new = pd.DataFrame([{
    "Tm": 17.5,
    "Tx": 32.0,
    "Tn": 3.0,
    "S": 0.0,
    "P": 60.0,
    "CDD": 25.0,
    "Weather_Month_Num": 6,
    "Year": 2024
}])

y_pred = model.predict(X_new)
print("Predicted fires:", y_pred)
```

---

## ✅ Current Status

✔️ Core pipeline complete:

* ✅ Cleaned weather + fire count datasets (2000–2023)
* ✅ Merged and aggregated per station per month
* ✅ Trained ML model on aggregated dataset
* ✅ Backend integration and prediction API
* ✅ CSV upload + file parsing working
* ✅ Map color visualization and tooltips

---

## ⏳ UX Features

* Animated splash loader (\~1.5s)
* Prediction button disables on click
* RingLoader spinner during model run
* Fire count animates from 0 to predicted value

---

## 🔮 Future Enhancements

* 🔁 Integrate live weather APIs (e.g., OpenWeatherMap)
* 🛰️ Add satellite/vegetation data
* 🔄 Monthly model retraining
* 📊 Add dashboard for trend analysis

---

## 📍 Live Demo

* **Frontend**: [https://your-frontend.vercel.app](http://fire-predict.vercel.app/)](#)

---

## 👥 Team

| Role              | Member                  |
| ----------------- | ----------------------- |
| 🔧 ML & Backend   | Madison Zhang & Preethi |
| 💻 Frontend UI    | Tenzing Woser           |
| 🤖 AI Integration | \[Teammate 3]           |

---

## 📜 License

[MIT License](LICENSE)
