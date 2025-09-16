import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function MainPanel({ onViewRulesetsClick, onCreateRulesetClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "flex-start",
      }}
    >
      <Button variant="contained" color="primary" onClick={onCreateRulesetClick}>
        create ruleset
      </Button>
      <Button variant="outlined" onClick={onViewRulesetsClick}>
        view rulesets
      </Button>
    </Box>
  );
}