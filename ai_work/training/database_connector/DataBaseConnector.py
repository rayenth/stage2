# database_connector.py
import pandas as pd
import pymysql
from sklearn.model_selection import train_test_split

class DatabaseConnector:
    def __init__(self, host, user, password, database):
        self.config = {
            'host': host,
            'user': user,
            'password': password,
            'database': database
        }
        self.conn = None

    def connect(self):
        self.conn = pymysql.connect(**self.config)

    def fetch_data(self, query):
        if self.conn is None:
            self.connect()
        df = pd.read_sql(query, self.conn)
        return df

    def close(self):
        if self.conn is not None:
            self.conn.close()
            self.conn = None

    def fetch_and_split(self, query, target_columns, test_size=0.2, random_state=42):
        """
        Fetch data from DB and split into train/test sets.
        Returns: X_train, X_test, y_train, y_test (pandas DataFrames)
        """
        df = self.fetch_data(query)
        X = df.drop(columns=target_columns)
        y = df[target_columns]
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
        return X_train, X_test, y_train, y_test

    def fetch_in_chunks(self, query, chunksize=10000):
        """
        Fetch large query results in chunks.
        Yields: pandas DataFrames of size chunksize
        """
        if self.conn is None:
            self.connect()
        for chunk in pd.read_sql(query, self.conn, chunksize=chunksize):
            yield chunk


def main():
    # Example usage
    print("This is a database connector module using PyMySQL.")

if __name__ == "__main__":
    main()
