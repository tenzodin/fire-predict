import pandas as pd
import pickle
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error

# Load the aggregated dataset
df = pd.read_csv("weather_fire_aggregated.csv")

# Must match the order used during training
feature_columns = ["Year", "Tm", "Tx", "Tn", "S", "P", "CDD", "Weather_Month_Num"]

X = df[feature_columns]
y = df["Fires_Ontario_Total"]

# Load the saved model
with open("forest_fire_model_aggregated.pkl", "rb") as f:
    model = pickle.load(f)

# Predict
y_pred = model.predict(X)

# Compute MAE again
mae = mean_absolute_error(y, y_pred)
print(f"MAE on full dataset: {mae:.2f}")

# Plot
plt.figure(figsize=(8,6))
plt.scatter(y, y_pred, alpha=0.7)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'k--', lw=2, label="Perfect Prediction")
plt.xlabel("Actual Fires")
plt.ylabel("Predicted Fires")
plt.title("Predicted vs Actual Monthly Fires")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()