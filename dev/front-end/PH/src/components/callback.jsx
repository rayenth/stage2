// Callback.jsx
import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Authorization code:", code);

    // Here you can call your backend to exchange code for tokens
  }, []);

  return <div>Logging in... please wait.</div>;
};

export default Callback;
