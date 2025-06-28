import pandas as pd
import pickle

# Load the trained model
with open("/Users/wentaozhang/Downloads/solutionhack1/forest_fire_model_aggregated.pkl", "rb") as f:
    model = pickle.load(f)

# Load your aggregated May 2025 weather row
agg = pd.read_csv("fire-predict/ml-model/weather_may_2025_aggregated.csv")

# Ensure the column order matches what the model expects
# If needed, reorder explicitly:
expected_cols = ["Tm", "Tx", "Tn", "S", "P", "CDD", "Weather_Month_Num", "Year"]
agg = agg[expected_cols]

# Predict
prediction = model.predict(agg)

print(f"🔥 Predicted number of fires in June 2025: {prediction[0]:.0f}")