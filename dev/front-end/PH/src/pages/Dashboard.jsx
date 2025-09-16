import React, { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { Navigate } from "react-router-dom";

import ChatBox from "../components/chat_interface2.jsx"
import CollapsibleSidePanel from "../components/side_bar_2.jsx";
import HorizontalCollapsiblePanel from "../components/HorizontalCollapsiblePanel.jsx";

export default function Dashboard() {
    const { loginInProgress, logOut } = useContext(AuthContext);
console.log("Dashboard: Is Authenticated?", loginInProgress);
    // If the user is not authenticated, redirect them to the login page
   if (!loginInProgress) {

    // Otherwise, show the main application UI
    return (
        <>
            <ChatBox />
            <CollapsibleSidePanel />
            <HorizontalCollapsiblePanel />
            <button onClick={logOut}>Log Out</button>
        </>
    );}
}