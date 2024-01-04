import "./css/style.css";
import "./charts/ChartjsConfig";

import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import PackageCheckout from "./pages/PackageCheckout";
import Packages from "./pages/Packages";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
// Import pages
import Wallet from "./pages/Wallet";
import AuthWrapper from "./providers/AuthGuard";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path='*'
          element={
            <AuthWrapper>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                {/* <Route path='/wallet' element={<Wallet />} /> */}

                <Route path='/settings' element={<Settings />} />
                <Route path='/packages' element={<Packages />} />
                <Route path='/packages/checkout' element={<PackageCheckout />} />
              </Routes>
            </AuthWrapper>
          }
        />
        <Route path='/register/verify' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
