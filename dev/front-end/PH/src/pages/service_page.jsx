import React, { useState } from "react";
import { Box, IconButton, Grow } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";

import CollapsibleSidePanel from "./components/side_bar_2.jsx";
import ChatBox from "./components/chat_interface.jsx";
import RuleSetPanel from "./components/rulesetpanel.jsx"; 

export default function servicePage() {


  return (


    <>
      <ChatBox></ChatBox>  
      <CollapsibleSidePanel></CollapsibleSidePanel>
      <RuleSetPanel></RuleSetPanel>
    </>
  );
}