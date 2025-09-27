import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Divider
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import axios from 'axios';

export default function MainPanel({ onViewRulesetsClick, onCreateRulesetClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [members, setMembers] = useState([]);
  const [rules, setRules] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  const clearAllStates = () => {
    setContracts([]);
    setCompanies([]);
    setMembers([]);
    setRules([]);
    setPolicies([]);
    setClaims([]);
  };

  const fetchContracts = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
        const contractsResponse = await axios.get('http://localhost:9090/api/contracts');
        // The backend now sends the company name directly, so no need for extra calls
        setContracts(contractsResponse.data);
        console.log("Contracts loaded successfully.");
    } catch (error) {
        console.error("API call failed:", error);
    } finally {
        setIsLoading(false);
    }
};

  const fetchCompanies = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
      const response = await axios.get('http://localhost:9090/api/companies');
      setCompanies(response.data);
      console.log("Companies loaded successfully.");
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMembers = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
      const response = await axios.get('http://localhost:9090/api/members');
      setMembers(response.data);
      console.log("Members loaded successfully.");
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRules = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
      const response = await axios.get('http://localhost:9090/api/rules');
      setRules(response.data);
      console.log("Rules loaded successfully.");
    } catch (error) {
      console.error("Failed to fetch rules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPolicies = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
      const response = await axios.get('http://localhost:9090/api/policies');
      setPolicies(response.data);
      console.log("Policies loaded successfully.");
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClaims = async () => {
    setIsLoading(true);
    clearAllStates();
    try {
      const response = await axios.get('http://localhost:9090/api/claims');
      setClaims(response.data);
      console.log("Claims loaded successfully.");
    } catch (error) {
      console.error("Failed to fetch claims:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDataList = (data, title) => {
    if (!data || data.length === 0) return null;

    return (
      <Box sx={{ mt: 3, width: '100%' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <List dense>
          {data.map((item, index) => (
            <Box key={index} sx={{ mb: 2, border: '1px solid #e0e0e0', p: 1, borderRadius: '4px' }}>
              {Object.keys(item).map((key) => {
                const value = item[key];
                // Check for keys that should be skipped or styled
                if (key === 'id' || key.includes('_id')) {
                    return null; // Don't render IDs
                }

                if (key === 'name' || key === 'policy_name' || key === 'rule_name') {
                  return (
                    <Typography 
                      key={key} 
                      variant="h6" 
                      sx={{ fontWeight: 'bold', color: 'black' }}
                    >
                      {value}
                    </Typography>
                  );
                }
                
                // Render other attributes with smaller, grey font
                return (
                  <Typography 
                    key={key} 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {key.replace(/_/g, ' ')}: {typeof value === 'object' ? value.date || JSON.stringify(value) : value.toString()}
                  </Typography>
                );
              })}
            </Box>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Dashboard</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Manage your rulesets or create a new one.
      </Typography>
      <List disablePadding sx={{ width: '100%', maxWidth: 360 }}>
        {/* View Contracts Button */}
        <ListItemButton onClick={fetchContracts} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText primary="View Contracts" />
        </ListItemButton>
        
        {/* View Companies Button */}
        <ListItemButton onClick={fetchCompanies} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><BusinessIcon /></ListItemIcon>
          <ListItemText primary="View Companies" />
        </ListItemButton>

        {/* View Members Button */}
        <ListItemButton onClick={fetchMembers} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="View Members" />
        </ListItemButton>

        {/* View Policies Button */}
        <ListItemButton onClick={fetchPolicies} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary="View Policies" />
        </ListItemButton>

        {/* View Rules Button */}
        <ListItemButton onClick={fetchRules} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary="View Rules" />
        </ListItemButton>

        {/* View Claims Button */}
        <ListItemButton onClick={fetchClaims} disabled={isLoading} sx={{ mb: 1, minHeight: 48 }}>
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="View Claims" />
        </ListItemButton>
        
        {/* Create Ruleset Button */}
        <ListItemButton onClick={onCreateRulesetClick} disabled={isLoading} sx={{ minHeight: 48 }}>
          <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
          <ListItemText primary="Create Ruleset" />
        </ListItemButton>
      </List>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress size={24} /></Box>
      )}

      {/* Render Lists based on state, using the new function */}
      {renderDataList(contracts, "Contracts Found")}
      {renderDataList(companies, "Companies Found")}
      {renderDataList(members, "Members Found")}
      {renderDataList(policies, "Policies Found")}
      {renderDataList(rules, "Rules Found")}
      {renderDataList(claims, "Claims Found")}

      {!isLoading && contracts.length === 0 && companies.length === 0 && members.length === 0 && rules.length === 0 && policies.length === 0 && claims.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>No data found in the database.</Typography>
      )}
    </Box>
  );
}
