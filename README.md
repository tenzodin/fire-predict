# 🔥 Forest Fire Predictor

An AI-powered web application that predicts and visualizes wildfire risk across geographic locations based on user-uploaded environmental data.

🚀 Built with:
- **Machine Learning (Random Forest)**
- **FastAPI (Python backend)**
- **React + Leaflet.js (Frontend map UI)**
- **OpenAI GPT (Human-readable explanations)**

---

## 🌍 What It Does

1. Upload a CSV file containing `latitude`, `longitude`, and environmental data (temperature, humidity, wind speed, etc.)
2. Our ML model predicts the **probability of fire** for each point
3. The frontend displays each location on a **live map**:
   - 🔴 Red = high risk
   - 🟡 Yellow = medium risk
   - 🟢 Green = low risk
4. GPT-powered explanations describe **why** a location is risky and suggest **prevention tips**

---

## 🧠 How It Works

```mermaid
graph LR
A[CSV Upload (React)] --> B[FastAPI API]
B --> C[ML Model (.pkl)]
C --> D[Risk Predictions (0.0–1.0)]
D --> E[OpenAI GPT Explanation]
E --> F[Map + Tooltip Display (React)]
