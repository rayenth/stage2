import React, { useState } from "react";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MainPanel from "./MainPanel.jsx";
import RuleSetPanel from "./RuleSetPanel.jsx";

export default function HorizontalCollapsiblePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState("main");

  const collapsedHeight = 60;

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setViewMode("main");
    }
  };
  
  const handleViewRulesetsClick = () => setViewMode("rulesets_list");
  const handleCreateRulesetClick = () => setViewMode("create_ruleset");
  const handleBackClick = () => setViewMode("main");

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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}>
        {isExpanded && viewMode === "main" && (
          <MainPanel 
            onViewRulesetsClick={handleViewRulesetsClick} 
            onCreateRulesetClick={handleCreateRulesetClick}
          />
        )}

        {isExpanded && (viewMode === "rulesets_list" || viewMode === "create_ruleset") && (
          // Pass `isSelectable` prop to control checkboxes and button
          <RuleSetPanel
            onBackClick={handleBackClick} 
            isSelectable={viewMode === "create_ruleset"}
          />
        )}
        
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

      <Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
        <IconButton onClick={togglePanel} sx={{ p: 1 }}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    </Paper>
  );
}