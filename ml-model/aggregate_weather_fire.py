import pandas as pd

# Load your merged data (update this filename if needed)
df = pd.read_csv("ml-model/weather_fire_merged_shifted.csv")

print("✅ Raw data loaded:")
print(df.head())

# Group by Year and Weather_Month
agg_df = (
    df.groupby(["Year", "Weather_Month", "Fire_Month", "Fires_Ontario_Total"], as_index=False)
    .agg({
        "Tm": "mean",
        "Tx": "mean",
        "Tn": "mean",
        "S": "mean",
        "P": "mean",
        "CDD": "mean"
    })
)

# Convert Weather_Month to numeric
month_mapping = {"May": 5, "June": 6, "July": 7}
agg_df["Weather_Month_Num"] = agg_df["Weather_Month"].map(month_mapping)

# Sort for readability
agg_df = agg_df.sort_values(["Year", "Weather_Month"])

print("\n✅ Aggregated data sample:")
print(agg_df.head())

# Save
agg_df.to_csv("weather_fire_aggregated.csv", index=False)
print("\n✅ Aggregated dataset saved as weather_fire_aggregated.csv")