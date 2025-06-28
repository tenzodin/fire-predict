import pandas as pd

# Load weather data (May–July for all years)
weather_file = "ml-model/merged_weather_data_2000_2024_May.csv"
df_weather = pd.read_csv(weather_file)

# Load fire counts data
fire_file = "ml-model/fire_counts_clean.csv"
df_fires = pd.read_csv(fire_file)

# Map Month to Next Month
month_mapping = {
    "May": "June",
    "June": "July",
    "July": "August"
}

# Add 'Fire_Month' column: the month the fire will occur
df_weather["Fire_Month"] = df_weather["Month"].map(month_mapping)

# Drop any rows where mapping didn't apply (e.g., August data)
df_weather = df_weather.dropna(subset=["Fire_Month"])

# Now merge on Year + Fire_Month
df_merged = pd.merge(
    df_weather,
    df_fires,
    how="inner",
    left_on=["Year", "Fire_Month"],
    right_on=["Year", "Month"],
    suffixes=("_weather", "_fire")
)

# Clean up columns
df_merged = df_merged.drop(columns=["Month_fire"])
df_merged = df_merged.rename(columns={"Month_weather": "Weather_Month", "Fires": "Fires_Ontario_Total"})

# Output preview
print(df_merged.head())

# Save merged dataset
df_merged.to_csv("weather_fire_merged_shifted.csv", index=False)
print("✅ Merged file saved: weather_fire_merged_shifted.csv")