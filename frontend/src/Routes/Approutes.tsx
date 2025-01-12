import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from 'react'
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/Landingpage";
const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Approutes