import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import ExpandLess from "@mui/icons-material/ExpandMore";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CollapsibleSidePanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [sessionsOpen, setSessionsOpen] = useState(true);

  const expandedWidth = 250;
  const collapsedWidth = 60;

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  const sessions = ["Session 1", "Session 2", "Session 3"];

  return (
    <Paper
      elevation={4}
      sx={{
        // --- Add these new properties ---
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100, // Make sure it's on top of other content
        // ---------------------------------
        width: isExpanded ? expandedWidth : collapsedWidth,
        height: "100vh",
        overflow: "hidden",
        p: 2,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease-in-out",
        borderRadius: 0,
      }}
    >
      {/* Top section with the toggle button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isExpanded ? "flex-end" : "center",
          mb: 2,
        }}
      >
        <IconButton onClick={togglePanel} sx={{ p: 1 }}>
          {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      {/* --- Settings Section --- */}
      <List disablePadding>
        <ListItemButton onClick={() => setSettingsOpen(!settingsOpen)} sx={{ minHeight: 48, justifyContent: isExpanded ? 'initial' : 'center', px: 2.5, }}>
          <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>
            <SettingsIcon />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="Settings" />}
          {isExpanded && (settingsOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {isExpanded && (
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4, display: "flex", flexDirection: "column", gap: 1 }}>
              <Button variant="outlined" size="small">
                Option 1
              </Button>
              <Button variant="outlined" size="small">
                Option 2
              </Button>
            </Box>
          </Collapse>
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* --- Sessions Section --- */}
      <List disablePadding>
        <ListItemButton onClick={() => setSessionsOpen(!sessionsOpen)} sx={{ minHeight: 48, justifyContent: isExpanded ? 'initial' : 'center', px: 2.5, }}>
          <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>
            <HistoryIcon />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="Saved Sessions" />}
          {isExpanded && (sessionsOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {isExpanded && (
          <Collapse in={sessionsOpen} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4, display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
              {sessions.length > 0 ? (
                sessions.map((s, idx) => (
                  <Button key={idx} variant="outlined" size="small">
                    {s}
                  </Button>
                ))
              ) : (
                <Typography variant="body2">No saved sessions</Typography>
              )}
            </Box>
          </Collapse>
        )}
      </List>
    </Paper>
  );
}