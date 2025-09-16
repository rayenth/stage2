import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateRulesetPanel({ onBackClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "flex-start",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton onClick={onBackClick}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Create New Ruleset</Typography>
      </Box>

      <Typography variant="body1">
        Here you would add form fields to create a new ruleset.
      </Typography>

      <Box
        sx={{
          mt: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </Box>
  );
}