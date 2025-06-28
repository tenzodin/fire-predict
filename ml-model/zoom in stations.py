import pandas as pd

# Load your merged dataset
df = pd.read_csv("merged_weather_data_2000_2024.csv")

# Define northern stations (feel free to tweak)
northern_stations = [
    "SIOUX LOOKOUT A",
    "RED LAKE A",
    "TIMMINS VICTOR POWER A",
    "GERALDTON A",
    "ARMSTRONG (AUT)",
    "PICKLE LAKE A",
    "FORT SEVERN A",
    "MUSKRAT DAM 'A', ONTARIO",
    "LANSDOWNE HOUSE (AUT)"
]

# Filter
df_north = df[df["Stn_Name"].isin(northern_stations)]

# Print number of rows
print(f"Number of rows: {len(df_north)}")

# Check missing values
print("\nMissing values per column:")
print(df_north.isna().sum())

# Quick stats
print("\nDescriptive statistics:")
print(df_north.describe())

# Peek at first rows
print("\nFirst 5 rows:")
print(df_north.head())