import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import  { UserProvider } from './Context/UserContext.tsx'
import { CaptainProvider } from './Context/CaptainContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <CaptainProvider>
  <UserProvider>
      <App />
  </UserProvider>
  </CaptainProvider>
  </StrictMode>
  ,
)
