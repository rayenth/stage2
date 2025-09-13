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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function SidePanel({ sessions = [] }) {
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [sessionsOpen, setSessionsOpen] = useState(true);

  return (
    <Paper
      elevation={4}
      sx={{
        width: 250,
        height: "100vh",
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Settings Section */}
      <List disablePadding>
        <ListItemButton onClick={() => setSettingsOpen(!settingsOpen)}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {settingsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
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
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Sessions Section */}
      <List disablePadding>
        <ListItemButton onClick={() => setSessionsOpen(!sessionsOpen)}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Sessions" />
          {sessionsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
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
      </List>
    </Paper>
  );
}
