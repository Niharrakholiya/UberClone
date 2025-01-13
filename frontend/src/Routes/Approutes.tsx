import {Routes,Route} from "react-router-dom";
import React from 'react'
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/Landingpage";
import CaptainAuthPage from "../pages/CaptainAuthpage";
import CaptainProtectWrapper from "../Wrapper/CaptainProtectWrapper";
import UserProtectWrapper from "../Wrapper/UserProtectWrapper";
import UserDashboard from "../pages/UserDashboard";
import CaptainDashboard from "../pages/CaptainDashboard";

const Approutes = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/captainauth" element={<CaptainAuthPage />} />
        <Route path="/user-dashboard" element={<UserProtectWrapper><UserDashboard /></UserProtectWrapper>} />
        <Route path="/captain-dashboard" element={<CaptainProtectWrapper><CaptainDashboard /></CaptainProtectWrapper>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
  )
}



export default Approutes