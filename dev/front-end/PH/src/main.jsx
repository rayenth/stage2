import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import ChatBox from './components/chat_interface.jsx'
import SidePanel from './components/side_bar.jsx'
 

// In your login page


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
   <SidePanel></SidePanel>
   <ChatBox></ChatBox>  
  </>
  </StrictMode>,
)
