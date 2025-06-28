import pandas as pd
import os
import re

# ✅ Path to your single May 2025 file
file = "/Users/wentaozhang/Downloads/solutionhack1/may2025/weather_may_2025.csv"

# ✅ Read the CSV
df = pd.read_csv(file)

# ✅ Keep only relevant columns
keep_cols = ["Stn_Name", "Tm", "Tx", "Tn", "S", "P", "CDD"]
df = df[[col for col in keep_cols if col in df.columns]]

# ✅ Assign year and month
df["Year"] = 2025
df["Month"] = "May"

# ✅ (Optional) Preview cleaned data
print("✅ Cleaned data preview:")
print(df.head())

# ✅ Save cleaned station-level file
# output_file = "weather_may_2025_clean.csv"
# df.to_csv(output_file, index=False)
# print(f"✅ Cleaned CSV saved: {output_file}")

# ✅ Create aggregated row for prediction
agg = df[["Tm", "Tx", "Tn", "S", "P", "CDD"]].mean().to_frame().T
agg["Weather_Month_Num"] = 5
agg["Year"] = 2025

# ✅ Reorder columns nicely
agg = agg[["Tm", "Tx", "Tn", "S", "P", "CDD", "Weather_Month_Num", "Year"]]

# ✅ Save aggregated row
agg_output = "weather_may_2025_aggregated.csv"
agg.to_csv(agg_output, index=False)
print(f"✅ Aggregated CSV saved: {agg_output}")