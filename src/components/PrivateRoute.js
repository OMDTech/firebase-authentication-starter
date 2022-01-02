import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  // check of current user still loged in 
  return currentUser ? children : <Navigate to="/login" />;
}
