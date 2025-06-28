import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# Load aggregated dataset
df = pd.read_csv("fire-predict/ml-model/weather_fire_aggregated.csv")
print("✅ Aggregated data loaded:")
print(df.head())

# Features and target
X = df[["Tm", "Tx", "Tn", "S", "P", "CDD", "Weather_Month_Num", "Year"]]
y = df["Fires_Ontario_Total"]

# Handle any missing values
X = X.fillna(X.mean())

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, y_pred)
print(f"✅ MAE on test set: {mae:.2f}")

# Save model
import pickle
save_path = "users/wentaozhang/downloads/solutionhack1"
with open(save_path,"wb") as f:
    pickle.dump(model, f)
print("✅ Model saved at users/wentaozhang/downloads/solutionhack1")