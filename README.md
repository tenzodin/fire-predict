# 🔥 Forest Fire Predictor

An AI-powered web app that predicts and visualizes wildfire risk across geographic locations based on user-uploaded environmental data.

---

## 🚀 Tech Stack

- 🧠 **ML Model**: Random Forest Classifier (`scikit-learn`)
- ⚙️ **Backend**: FastAPI (Python)
- 🌐 **Frontend**: React + Tailwind CSS + Leaflet.js
- 🤖 **AI Explanation**: OpenAI GPT (natural language fire risk summaries)
- ☁️ **Hosting**: Vercel (frontend), Render (backend)

---

## 🌍 What It Does - updated June 28

1. Upload a `.csv` file containing weather data for selected locations (temperature, precipitation, etc.).~~location + environmental data (e.g. temperature, humidity, wind)~~
2. The ML model returns a **predicted wildfire occurrence tier** (e.g., low / medium / high) for the next month in Ontario.~~**fire risk score** (probability from 0 to 1) for each point~~
3. The frontend renders a **color-coded map** using Leaflet:
   - 🟥 Red = ~~high fire risk~~ higher expected number of fires (to update: 100?)
   - 🟨 Yellow = ~~medium risk~~ moderate expected number
   - 🟩 Green = ~~low risk~~ lower expected number
4. Each point also gets a **GPT-generated explanation and prevention tip**

---

## 🧠 How It Works

```mermaid
graph LR
A(User CSV Upload - Frontend) --> B(FastAPI API - Backend)
B --> C(ML Model - .pkl)
C --> D(Fire Risk Probabilities)
D --> E(OpenAI GPT Explanation)
E --> F(Map + Tooltip Display - Frontend)


---

## 🗂️ Project Structure

```
forest-fire-predictor/
├── ml-model/              # ML model training scripts
│   ├── train_model.py
│   ├── merge_weather_fire.py
│   ├── forest_fire_merged.pkl
│   └── fire_counts_clean.csv
├── web-app/
│   ├── frontend/          # React + Leaflet map UI
│   └── backend/           # FastAPI API
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

---

## 📁 Sample CSV Format

Your input CSV should look like this:

```csv
Station,TempMax,TempMin,TempMean,Precipitation,CoolingDegreeDays
Pickle Lake,32,5,18,65,45
Red Lake,30,6,17,70,50
Sioux Lookout,33,4,19,80,60

```

Each row = one ~~location~~ station in Ontario
🔥 Output = ~~fire risk score (0–1)~~ **predicted wildfire tier** + natural language explanation

---

## 🤖 Example GPT Explanation

> “This location has ~~an 83% fire risk~~ **to be updated** due to high temperatures (34°C), low humidity (12%), and strong winds. Avoid open flames and clear dry brush nearby.”

---

## 📍 Live Demo

* **Frontend**: [https://your-frontend.vercel.app](#)
* **Backend API**: [https://your-backend.onrender.com](#)

---

## 🧑‍💻 Team

* **Madison Zhang & Preethi** – ML & Backend
* **Tenzing Woser** – Frontend Development
* **\[Teammate 3]** – AI Integration / GPT

---

## 🏁 Status

✅ Core pipeline complete:
	•	Cleaned historical weather and fire data (2000–2024)
	•	Merged dataset ready for training
	•	Data ingestion + preprocessing scripts working

🛠️ Next steps before pitch:
	•	Train regression/classification model to predict monthly fire occurrence tiers
	•	Connect ML predictions to backend API
	•	Generate example predictions for key stations
	•	Display risk tiers on the Leaflet map
	•	Polish frontend upload + result display
---

## 📜 License

[MIT License](LICENSE)

---
