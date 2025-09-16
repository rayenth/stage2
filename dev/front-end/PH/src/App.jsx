import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LogInPage from './pages/logInPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}