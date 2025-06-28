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

## 🌍 What It Does

1. Upload a `.csv` file containing location + environmental data (e.g. temperature, humidity, wind)
2. The ML model returns a **fire risk score** (probability from 0 to 1) for each point
3. The frontend renders a **color-coded map** using Leaflet:
   - 🟥 Red = high fire risk
   - 🟨 Yellow = medium risk
   - 🟩 Green = low risk
4. Each point also gets a **GPT-generated explanation and prevention tip**

---

## 🧠 How It Works

```mermaid
graph LR
A[User CSV Upload (Frontend)] --> B[FastAPI API (Backend)]
B --> C[ML Model (.pkl)]
C --> D[Fire Risk Probabilities]
D --> E[OpenAI GPT (Explain Prediction)]
E --> F[Map + Tooltip Display (Frontend)]
````

---

## 🗂️ Project Structure

```
forest-fire-predictor/
├── ml-model/              # ML model training scripts
│   ├── train_model.py
│   ├── forest_fire_model.pkl
│   └── sample_data.csv
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
lat,lon,temp,humidity,wind_speed
43.67,-79.38,32,14,20
44.01,-79.70,28,30,10
43.80,-79.20,35,12,22
```

Each row = one location
🔥 Output = fire risk score (0–1) + natural language explanation

---

## 🤖 Example GPT Explanation

> “This location has an 83% fire risk due to high temperatures (34°C), low humidity (12%), and strong winds. Avoid open flames and clear dry brush nearby.”

---

## 📍 Live Demo

* **Frontend**: [https://your-frontend.vercel.app](#)
* **Backend API**: [https://your-backend.onrender.com](#)

---

## 🧑‍💻 Team

* **Tenzing Woser** – ML & Backend
* **\[Teammate 2]** – Frontend Development
* **\[Teammate 3]** – AI Integration / GPT

---

## 🏁 Status

✅ Core MVP complete
🛠️ Next steps:

* Add live weather API (OpenWeatherMap)
* Polygon-based predictions
* Save past user sessions

---

## 📜 License

[MIT License](LICENSE)

---
