import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oauth2-code-pkce';
import App from './App.jsx';
import { authConfig} from './authconfig.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider authConfig={authConfig} loadingComponent={<div>Loading...</div>}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);