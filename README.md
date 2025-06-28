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
   - 🟢 Low Risk	Fewer than 50		Routine local response
   - 🟡 Moderate	50–150			Pre-position resources, regional support
   - 🟠 High Risk	150–300			Full deployment, interagency coordination
   - 🔴 Extreme	Over 300		National/international assistance
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
	•	**Cleaned historical weather and fire data (2000–2024)**  
 		1. [Data merge script](https://github.com/tenzodin/fire-predict/blob/89b0ab9d55060cadd617a7bc0f9563c5b75cbdf9/ml-model/merge_weather.py)  
   		2. [Output.csv](https://github.com/tenzodin/fire-predict/blob/89b0ab9d55060cadd617a7bc0f9563c5b75cbdf9/ml-model/merged_weather_data_2000_2024.csv)  
	•	**Cleaned historical number of fires per month data (2000-2023)**  
 		1. [Date clean up script](https://github.com/tenzodin/fire-predict/blob/89b0ab9d55060cadd617a7bc0f9563c5b75cbdf9/ml-model/fire_counts_clean_up.py)  
   		2. [Output.csv](https://github.com/tenzodin/fire-predict/blob/89b0ab9d55060cadd617a7bc0f9563c5b75cbdf9/ml-model/fire_counts_clean.csv)  
	•	**Merged dataset ready for training**  
		1.  [Merge weather data and number of fires](https://github.com/tenzodin/fire-predict/blob/821c657d398b6d6f0ca18d96861acc5a18297b6f/ml-model/merge_pair.py)  
  		2. [Merged data output.csv](https://github.com/tenzodin/fire-predict/blob/821c657d398b6d6f0ca18d96861acc5a18297b6f/ml-model/weather_fire_merged_shifted.csv)  
	•	**Feed dataset to ML model:**[Training script](https://github.com/tenzodin/fire-predict/blob/dd1a6c79fa362b41da64c9e7e8e2f9dfaf2db26b/ml-model/train_model_aggregated.py)  

🛠️ Next steps before pitch:
	•	~~Train regression/classification model to predict monthly fire occurrence tiers~~
	•	~~Connect ML predictions to backend API~~
	•	~~Generate example predictions for key stations~~
	•	Display risk tiers on the Leaflet map
	•	Polish frontend upload + result display
---
**📈 Fire Prediction Model**

This project includes a **Random Forest Regressor** trained to predict the **monthly number of wildfires in Ontario** based on aggregated weather data.

⸻

🎯 **How It Works**

**Input:**
A single record (or batch) of monthly weather data, including:
	•	Mean / max / min temperature
	•	Rainfall & precipitation
	•	Cooling Degree Days
	•	Month & year

Output:
A predicted number of fires for that month.

⸻

🛠️ **Model File**

The trained model is saved as:
forest_fire_model_aggregated.pkl

🧑‍💻 **Sample Python Code**

import pandas as pd
import pickle

#Load the model
with open("path/to/forest_fire_model_aggregated.pkl", "rb") as f:
    model = pickle.load(f)

#Example input
X_new = pd.DataFrame([{
    "Tm": 17.5,                # Mean temperature °C
    "Tx": 32.0,                # Max temperature °C
    "Tn": 3.0,                 # Min temperature °C
    "S": 0.0,                  # Rainfall mm
    "P": 60.0,                 # Precipitation mm
    "CDD": 25.0,               # Cooling Degree Days
    "Weather_Month_Num": 6,    # Month number (May=5, June=6, July=7)
    "Year": 2024               # Year
}])

#Predict
y_pred = model.predict(X_new)
print("Predicted fires:", y_pred)

📊 **Feature Details**
**Feature					Description**
Tm					Mean temperature (°C)
Tx					Max temperature (°C)
Tn					Min temperature (°C)
S					Total Rainfall (mm)
P					Total Precipitation (mm)
CDD					Cooling Degree Days
Weather_Month_Num			Month of weather data (May=5, June=6, July=7)
Year					Year of observation

**Note**: All columns must exist when calling .predict(). Missing numeric values can be NaN and will be imputed automatically.

🎨 **Frontend Integration**
	•	Round predictions to whole numbers.
	•	Bucket predictions into risk levels:
Risk Tier	Monthly Fires		Typical Response
🟢 Low Risk	Fewer than 50		Routine local response
🟡 Moderate	50–150			Pre-position resources, regional support
🟠 High Risk	150–300			Full deployment, interagency coordination
🔴 Extreme	Over 300		National/international assistance

Note: Tiers are based on historical averages and are provided as guidance only.
⸻

🔄 **Future Enhancements**
	•	Integrate live weather APIs (e.g., OpenWeatherMap)
	•	Use station-level fire counts
	•	Add vegetation, drought indices, or satellite data
	•	Retrain with expanded datasets

## 📜 License

[MIT License](LICENSE)

---
