import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import  { UserProvider } from './Context/UserContext.tsx'
import { CaptainProvider } from './Context/CaptainContext.tsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
  <CaptainProvider>
  <UserProvider>
      <App />
  </UserProvider>
  </CaptainProvider>
  </StrictMode>
  </BrowserRouter>
  ,
)
