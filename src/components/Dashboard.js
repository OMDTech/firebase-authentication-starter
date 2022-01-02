import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  // used to set error message 
  const [error, setError] = useState("");
  //logout
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const logoutOnClick = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Faild to logout");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {/* Show Error Message wehn logout faild or somthing went wrong */}
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          variant="link"
          onClick={(e) => {
            logoutOnClick();
          }}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
