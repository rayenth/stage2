// src/components/Callback.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      try {
        const response = await fetch('http://localhost:9090/api/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: code }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setToken(data.access_token);
        navigate("/"); // Redirect after successful login
        
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        // Handle error (e.g., show an error message)
      }
    };

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location.search, setToken, navigate]);

  return <div>Logging in... please wait.</div>;
};

export default Callback;