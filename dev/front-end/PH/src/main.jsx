import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
 

// In your login page


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
   
    <App/>   
  </>
  </StrictMode>,
)
