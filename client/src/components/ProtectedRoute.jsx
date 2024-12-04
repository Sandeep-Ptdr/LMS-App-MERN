import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodeToken = jwtDecode(token);

    console.log("decodetoken", decodeToken);

    const currentTime = Date.now() / 1000;

    if (decodeToken.exp < currentTime) {
      localStorage.removeItem("authToken");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
