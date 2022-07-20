import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  console.log(loggedIn);
  if (!loggedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default React.memo(ProtectedRoute);
