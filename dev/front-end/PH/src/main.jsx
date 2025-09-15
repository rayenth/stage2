import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

import ChatBox from './components/chat_interface.jsx'
import CollapsibleSidePanel from './components/side_bar_2.jsx'
import RuleSetPanel  from './components/rulesetpanel.jsx'

// In your login page


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
    <App />

  </>
  </StrictMode>,
)
