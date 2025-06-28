import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib

# Load your merged dataset
df = pd.read_csv("ml-model/weather_fire_merged.csv")

# ===========================
# Feature Engineering
# ===========================

# One-hot encode Month
df = pd.get_dummies(df, columns=["Month"], drop_first=True)

# Interaction features
df["Tm_CDD"] = df["Tm"] * df["CDD"]
df["Tx_CDD"] = df["Tx"] * df["CDD"]
df["Tm_P"] = df["Tm"] * df["P"]

# Optionally, bin low precipitation
df["Low_Precip"] = (df["P"] < 20).astype(int)

# ===========================
# Features and Target
# ===========================
# Drop rows where target is missing
df = df.dropna(subset=["Fires_Ontario_Total"])
# Columns to use
feature_cols = [
    "Tm", "Tx", "Tn", "S", "P", "CDD",
    "Tm_CDD", "Tx_CDD", "Tm_P",
    "Low_Precip",
    "Month_July", "Month_June"  # August is baseline
]

X = df[feature_cols]
y = df["Fires_Ontario_Total"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===========================
# Train Model
# ===========================
model = HistGradientBoostingRegressor(max_iter=200, learning_rate=0.05, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, y_pred)
print(f"MAE on test set: {mae:.2f}")

# Save model
joblib.dump(model, "forest_fire_model.pkl")
print("✅ Model saved as forest_fire_model.pkl")