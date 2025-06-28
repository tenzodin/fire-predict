import pandas as pd
import os
import re

# ✅ Path to your single May 2025 file
file = "/Users/wentaozhang/Downloads/solutionhack1/may2025/weather_may_2025.csv"

# ✅ Map month numbers if you still prefer extracting from filename
month_map = {"05": "May"}

# ✅ Read the CSV
df = pd.read_csv(file)

# ✅ Keep only relevant columns
keep_cols = ["Stn_Name", "Tm", "Tx", "Tn", "S", "P", "CDD"]
df = df[[col for col in keep_cols if col in df.columns]]

# ✅ Manually assign year and month (since you know it's May 2025)
df["Year"] = 2025
df["Month"] = "May"

# ✅ (Optional) Print preview
print("✅ Cleaned data preview:")
print(df.head())

# ✅ Save
output_file = "weather_may_2025_clean.csv"
df.to_csv(output_file, index=False)
print(f"✅ Cleaned CSV saved: {output_file}")