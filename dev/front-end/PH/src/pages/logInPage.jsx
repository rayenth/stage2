import React, { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { Navigate } from "react-router-dom";
import { Box, IconButton, Grow, Button } from "@mui/material";

export default function LogInPage() {
    // This is the correct place to use the hook
    const {token,tokenData,logOut,loginInProgress ,logIn } = useContext(AuthContext);
     

    // This logic handles the redirection after a successful login

      console.log("LogInPage: Is Authenticated?", loginInProgress);

    if (loginInProgress) {
        
        return <Navigate to="/dashboard" />;
    }

    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#282c34",
            flexDirection: "column",
          }}
        >
          <h1>Welcome</h1>
          <Button variant="contained" onClick={() => logIn()}>
            Log In
          </Button>
        </Box>
    );
}