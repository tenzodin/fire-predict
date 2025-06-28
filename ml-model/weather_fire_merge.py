import pandas as pd

# === File paths ===
weather_file = "merged_weather_data_2000_2024.csv"
fire_file = "fire_counts_clean.csv"
output_file = "weather_fire_merged.csv"

# === Load weather data ===
weather_df = pd.read_csv(weather_file)

# === Load fire counts ===
fire_df = pd.read_csv(fire_file)

# === Rename Fires column to be clearer ===
fire_df = fire_df.rename(columns={"Fires": "Fires_Ontario_Total"})

# === Merge on Year and Month ===
merged_df = pd.merge(
    weather_df,
    fire_df,
    how="left",
    on=["Year", "Month"]
)

# === Quick sanity check ===
print("✅ Merged data sample:")
print(merged_df.head())

# === Save merged dataset ===
merged_df.to_csv(output_file, index=False)
print(f"✅ Saved merged file: {output_file}")