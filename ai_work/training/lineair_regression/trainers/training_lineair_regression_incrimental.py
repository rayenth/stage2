# linear_trainer_incremental.py
import pandas as pd
from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler
import numpy as np

class LinearModelTrainerIncremental:
    def __init__(self, scale=True):
        self.scale = scale                  # toggle scaling
        self.scaler = StandardScaler() if scale else None
        self.model = None                   # SGDRegressor will be initialized later
        self.numeric_cols = []
        self.categorical_cols = []
        self.feature_columns = []

    def preprocess(self, X, fit_scaler=False):
        # Identify numeric and categorical columns
        self.numeric_cols = X.select_dtypes(include='number').columns.tolist()
        self.categorical_cols = X.select_dtypes(include='object').columns.tolist()

        # Fill missing values
        X[self.numeric_cols] = X[self.numeric_cols].fillna(X[self.numeric_cols].mean())
        X[self.categorical_cols] = X[self.categorical_cols].fillna('unknown')

        # One-hot encode categorical columns
        X_encoded = pd.get_dummies(X, columns=self.categorical_cols, drop_first=True)

        # Scale numeric columns if needed
        if self.scale:
            if fit_scaler:
                self.scaler.fit(X_encoded[self.numeric_cols])
            X_encoded[self.numeric_cols] = self.scaler.transform(X_encoded[self.numeric_cols])

        self.feature_columns = X_encoded.columns.tolist()
        return X_encoded

    def initialize_model(self, n_targets=1):
        # Initialize SGDRegressor for single or multi-target
        self.model = SGDRegressor(max_iter=1, tol=None, learning_rate='invscaling', eta0=0.01)
        self.n_targets = n_targets

    def partial_fit(self, X, y, fit_scaler=False):
        """
        Incremental training on a chunk of data.
        y can be a Series or DataFrame for multi-target regression.
        """
        X_proc = self.preprocess(X, fit_scaler=fit_scaler)

        # Initialize model on first chunk
        if self.model is None:
            self.initialize_model(n_targets=y.shape[1] if isinstance(y, pd.DataFrame) else 1)

        # SGDRegressor supports only single target at a time, handle multi-target
        if isinstance(y, pd.DataFrame):
            preds = []
            for col in y.columns:
                if not hasattr(self, f'model_{col}'):
                    setattr(self, f'model_{col}', SGDRegressor(max_iter=1, tol=None, learning_rate='invscaling', eta0=0.01))
                model_col = getattr(self, f'model_{col}')
                model_col.partial_fit(X_proc, y[col])
                preds.append(model_col.predict(X_proc))
        else:
            self.model.partial_fit(X_proc, y)

    def predict(self, X):
        X_proc = self.preprocess(X, fit_scaler=False)
        if hasattr(self, 'n_targets') and self.n_targets > 1:
            preds = {}
            for col in range(self.n_targets):
                model_col = getattr(self, f'model_{col}')
                preds[col] = model_col.predict(X_proc)
            return pd.DataFrame(preds)
        else:
            return self.model.predict(X_proc)

    def get_coefficients(self, target_columns=None):
        coef_dict = {}
        # Single target
        if hasattr(self, 'model') and self.model is not None:
            if target_columns is None:
                target_columns = ['target']
            for i, target in enumerate(target_columns):
                if self.n_targets > 1:
                    model_col = getattr(self, f'model_{target}')
                    coef_dict[target] = dict(zip(self.feature_columns, model_col.coef_))
                else:
                    coef_dict[target] = dict(zip(self.feature_columns, self.model.coef_))
        return coef_dict
    

    if __name__ == "__main__":
        # Example usage
        print("This is a linear model trainer module.")
