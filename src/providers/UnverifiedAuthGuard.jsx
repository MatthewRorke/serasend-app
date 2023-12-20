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

  const validateToken = async () => {
    try {
      const token = getFromLocal("token");
      if (!token) {
        logout();
      }
      const userData = await getUser(token);
      if (userData && userData.success) {
        setAuthenticated(true);
        if (userData.data.verifiedEmail) {
          navigate("/dashboard");
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
