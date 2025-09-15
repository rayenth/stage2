# incremental_claims_training.py
import pandas as pd
from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler

# -----------------------------
# Preprocessing function
# -----------------------------
def preprocess(df, scaler=None, fit_scaler=False, feature_columns=None):
    df = df.copy()

    # Convert object columns that contain 'date' to numeric if any (not in your current CSV)
    object_cols = df.select_dtypes(include='object').columns.tolist()
    # If you later add date columns, can convert here

    # Identify numeric and categorical columns
    numeric_cols = df.select_dtypes(include=['number', 'bool']).columns.tolist()
    categorical_cols = df.select_dtypes(include='object').columns.tolist()

    # Fill missing values
    if numeric_cols:
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
    if categorical_cols:
        df[categorical_cols] = df[categorical_cols].fillna('unknown')

    # One-hot encode categorical columns
    if categorical_cols:
        df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)
    else:
        df_encoded = df.copy()

    # Scale numeric columns
    if scaler and numeric_cols:
        if fit_scaler:
            scaler.fit(df_encoded[numeric_cols])
        df_encoded[numeric_cols] = scaler.transform(df_encoded[numeric_cols])

    # Align columns across chunks
    if feature_columns is not None:
        df_encoded = df_encoded.reindex(columns=feature_columns, fill_value=0)

    return df_encoded

# -----------------------------
# Main incremental training
# -----------------------------
def main():
    csv_path = "MOCK_DATA.csv"  # your CSV path
    chunk_size = 100               # adjust as needed

    scaler = StandardScaler()
    model = SGDRegressor(max_iter=1, tol=None, learning_rate='invscaling', eta0=0.01)

    first_chunk = True
    feature_columns = None

    # Read CSV in chunks
    for chunk in pd.read_csv(csv_path, chunksize=chunk_size):
        # Assume 'approved_amount' is the target (can change)
        X = chunk.drop(columns=['approved_ammount'])
        y = chunk['approved_ammount']

        # Preprocess
        X_proc = preprocess(X, scaler=scaler, fit_scaler=first_chunk, feature_columns=feature_columns)

        # Save feature columns from first chunk
        if first_chunk:
            feature_columns = X_proc.columns
            first_chunk = False

        y_mean = y.mean()
        y_std = y.std()
        y_scaled = (y - y_mean) / y_std

        # Incremental training
        model.partial_fit(X_proc, y_scaled)

    # -----------------------------
    # Test on last chunk
    # -----------------------------
    X_test_proc = preprocess(X, scaler=scaler, feature_columns=feature_columns)
    y_pred_scaled = model.predict(X_test_proc)
    y_pred = y_pred_scaled * y_std + y_mean

    print("Test targets:", y.values)
    print("Predictions:", y_pred)

if __name__ == "__main__":
    main()
