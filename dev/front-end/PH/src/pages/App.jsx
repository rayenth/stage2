// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { login } from "../services/keycloakservice";
import Callback from "./callbackLogin";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <div>
                <h1>Dashboard</h1>
                <p>Access token: {token}</p>
              </div>
            ) : (
              <div>
                <h1>Login Page</h1>
                <button onClick={login}>Login with Keycloak</button>
              </div>
            )
          }
        />
        <Route path="/callback" element={<Callback setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
