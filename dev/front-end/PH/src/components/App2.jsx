// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Component to handle Keycloak callback
const Callback = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code && !setToken) {
      // Exchange code for access token via backend
      fetch("http://localhost:8080/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(data => {
          setToken(data.access_token);
          navigate("/"); // redirect to dashboard after getting token
        });
    }
  }, [location.search, setToken, navigate]);

  return <div>Logging in... please wait.</div>;
};

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    const keycloakUrl = "http://localhost:8080/realms/PolicyHub-Realm/protocol/openid-connect/auth"; // full correct URL
const clientId = "PolicyHub-Frontend";
const redirectUri = "http://localhost:5173/callback"; // must match Keycloak Valid Redirect URIs

window.location.href = `${keycloakUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;

  };

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
                <button onClick={handleLogin}>Login with Keycloak</button>
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
