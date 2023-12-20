import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../api/userApi";
import { clearLocal, getFromLocal } from "../utils/Utils";

const AuthWrapper = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigateTo = useNavigate();

  const logout = () => {
    setAuthenticated(false);
    clearLocal("token");
    navigateTo("/login");
  };

  const handleUnverifiedUser = () => {
    navigateTo("/register/verify");
  };

  const handleVerifiedUser = () => {
    setAuthenticated(true);
  };

  const handleUnsubscribedUser = () => {
    setAuthenticated(true);
    navigateTo("/packages");
  };

  const validateToken = async () => {
    try {
      const token = getFromLocal("token");
      if (!token) {
        logout();
      }
      const userData = await getUser(token);
      if (userData && userData.success) {
        if (!userData.data.verifiedEmail) {
          handleUnverifiedUser();
        } else if (!userData.data.packageName) {
          handleUnsubscribedUser();
        } else {
          handleVerifiedUser();
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error:", error);
      logout();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return authenticated ? <>{children}</> : null;
};

export default AuthWrapper;
