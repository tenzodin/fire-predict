import pandas as pd

df = pd.read_csv("merged_weather_data_2000_2024.csv")

print("\n✅ HEAD (first 5 rows):")
print(df.head())

print("\n✅ COLUMNS:")
print(df.columns)

print("\n✅ DATA TYPES:")
print(df.dtypes)

print("\n✅ BASIC STATS:")
print(df.describe())

print("\n✅ MISSING VALUES PER COLUMN:")
print(df.isna().sum())