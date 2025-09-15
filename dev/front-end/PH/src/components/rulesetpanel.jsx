import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

export default function HorizontalCollapsiblePanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const collapsedHeight = 60;

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 1300,
        left: "43%",
        transform: "translateX(-50%)",
        position: "fixed",
        top: 0,
        height: isExpanded ? "100vh" : collapsedHeight, 
        overflowY: isExpanded ? "auto" : "hidden",
        overflowX: "hidden",
        p: isExpanded ? 2 : 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        transition: "height 0.3s ease-in-out", 
        borderRadius: 2,
        zIndex: 100,
      }}
    >
      {/* Content box */}
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // Allows this box to take up the remaining space
      }}>
        
        
        {isExpanded && (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            alignItems: "flex-start",
          }}>
            <Button variant="contained" color="primary">
              create ruleset
            </Button>
            <Button variant="outlined">
              view rulesets
            </Button>
            
          </Box>
        )}

        {/*
          This text is visible when the panel is COLLAPSED
        */}
        {!isExpanded && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            height: '100%',
            p: 2,
          }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
             wanna add a new ruleset? click here!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Toggle Button */}
      <Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
        <IconButton onClick={togglePanel} sx={{ p: 1 }}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    </Paper>
  );
}