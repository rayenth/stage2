import { Box, Typography, TextField, Button } from "@mui/material";
import LoginImage from "./assets/adventure-time-finn-and-jake-s-treehouse-9vl8l9a058e110hu.jpg";

export default function App() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        bgcolor: "lightblue",
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          m: 8,  // margin around main box
        }}
      >
        {/* Login form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 300,
            p: 4,
          }}
        >
          <Typography variant="h4">Login</Typography>
          <TextField label="Username" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={LoginImage}
          alt="Login illustration"
          sx={{
            height: "100%",        // match the height of the login form
            maxHeight: "100%",     // prevents it from overflowing
            width: "auto",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      </Box>
    </Box>
  );
}
