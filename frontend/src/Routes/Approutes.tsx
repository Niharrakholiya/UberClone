import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from 'react'
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/Landingpage";
import CaptainAuthPage from "../pages/CaptainAuthpage";

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/captainauth" element={<CaptainAuthPage />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Approutes