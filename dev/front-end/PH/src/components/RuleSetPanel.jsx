import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RuleSetPanel({ onBackClick, isSelectable }) {
  const [checked, setChecked] = useState([]);

  const rulesets = [
    { id: 1, name: "Ruleset A" },
    { id: 2, name: "Ruleset B" },
    { id: 3, name: "Ruleset C" },
     { id: 4, name: "Ruleset d" },
    { id: 5, name: "Ruleset e" },
    { id: 6, name: "Ruleset f" },

  ];

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
        <Typography variant="h6">
          {isSelectable ? "Create New Ruleset" : "View Rulesets"}
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search rulesets..."
        sx={{ mb: 2 }}
      />

      <List sx={{ width: "100%", flexGrow: 1, overflowY: "auto" }}>
        {rulesets.map((ruleset) => {
          const labelId = `checkbox-list-label-${ruleset.id}`;

          return (
            <ListItem
              key={ruleset.id}
              onClick={isSelectable ? handleToggle(ruleset.id) : null}
              dense
              button
            >
              {isSelectable && (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(ruleset.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
              )}
              <ListItemText id={labelId} primary={ruleset.name} />
            </ListItem>
          );
        })}
      </List>
      
      {isSelectable && (
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
      )}
    </Box>
  );
}