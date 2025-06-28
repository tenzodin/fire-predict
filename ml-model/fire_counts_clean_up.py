import pandas as pd

# Load the raw fire data
file_path = "/Users/wentaozhang/Downloads/solutionhack1/number_of_fires_by_month.csv"
df = pd.read_csv(file_path, 
                 encoding="utf-16",
                 sep='\t')

# Show columns to confirm
print("✅ COLUMNS:")
print(df.columns)

# Drop Data Qualifier column if it exists
if "Data Qualifier" in df.columns:
    df = df.drop(columns=["Data Qualifier"])

# Confirm columns
print("✅ AFTER DROP:")
print(df.columns)

# Reshape: melt years into rows
df_melted = df.melt(
    id_vars=["Month"],
    var_name="Year",
    value_name="Fires"
)

# Remove 'Unspecified' months
df_melted = df_melted[~df_melted["Month"].str.contains("Unspecified", na=False)]

# Remove rows with no fire counts
df_melted = df_melted[df_melted["Fires"].notna()]

# Keep only rows where Year is numeric (drop the Jurisdiction header row)
df_melted = df_melted[df_melted["Year"].str.isnumeric()]

# Convert types
df_melted["Year"] = df_melted["Year"].astype(int)
df_melted["Fires"] = df_melted["Fires"].astype(int)

# Filter to only June, July, August
df_melted = df_melted[df_melted["Month"].isin(["June", "July", "August"])]

# Reset index
df_melted = df_melted.reset_index(drop=True)

print("✅ FIRST 5 ROWS:")
print(df_melted.head())

df_melted.to_csv("fire_counts_clean.csv", index=False)

print("✅ Saved: fire_counts_clean.csv")