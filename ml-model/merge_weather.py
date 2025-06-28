import pandas as pd
import glob
import os
import re

# Folder where you saved all your CSVs
folder =  "/Users/wentaozhang/Downloads/solutionhack1" 

# Get all CSV files
files = glob.glob(os.path.join(folder, "*.csv"))

# Map month numbers to names
month_map = {"06": "June", "07": "July", "08": "August"}

# List to hold DataFrames
dfs = []

for file in files:
    df = pd.read_csv(file)

    # Keep only relevant columns
    keep_cols = ["Stn_Name", "Tm", "Tx", "Tn", "S", "P", "CDD"]
    df = df[[col for col in keep_cols if col in df.columns]]

    # Extract year and month from filename
    filename = os.path.basename(file)
    pattern = r"_(\d{2})-(\d{4})"
    match = re.search(pattern, filename)
    if match:
        month_num = match.group(1)
        year = match.group(2)
        month = month_map.get(month_num)
        if not month:
            raise ValueError(f"Unknown month number: {month_num}")
    else:
        raise ValueError(f"Filename format not recognized: {filename}")

    # Add Year and Month columns
    df["Year"] = int(year)
    df["Month"] = month

    dfs.append(df)

# Combine all dataframes
result = pd.concat(dfs, ignore_index=True)

# Save to CSV
result.to_csv("merged_weather_data.csv", index=False)

print("✅ Merged CSV created: merged_weather_data.csv")