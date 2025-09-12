// src/components/Callback.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "../services/keycloakservice";

const Callback = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code).then((data) => {
        setToken(data.access_token);
        navigate("/"); // redirect after login
      });
    }
  }, [location.search, setToken, navigate]);

  return <div>Logging in... please wait.</div>;
};

export default Callback;
