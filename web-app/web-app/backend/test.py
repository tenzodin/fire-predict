import joblib, pandas as pd

# Load the model
try:
    mdl = joblib.load("model.pkl")
    print("✅ Model loaded")
    print("🔧 Model expects columns:", mdl.feature_names_in_.tolist())
except Exception as e:
    print("❌ Model load failed:", e)
    exit()

# Load the CSV
try:
    df = pd.read_csv("test/weather_may_2025.csv")
    print("📄 CSV columns:", df.columns.tolist())

    # Optional: rename columns to match expected if they don't match exactly
    if list(df.columns) != list(mdl.feature_names_in_):
        df.columns = mdl.feature_names_in_
        print("🛠 Renamed CSV columns to match model input.")

    # Predict
    preds = mdl.predict(df)
    print("🔮 Predictions:", preds[:5])  # just show first 5 predictions

except Exception as e:
    print("❌ CSV load or predict failed:", e)
