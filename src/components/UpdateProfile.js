import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const currentPassword = useRef();
  const { updateEmail, updatePassword, currentUser, reauthenticate } =
    useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password does not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const promises = [];

      if (emailRef.current.value !== currentUser.email) {
        // re authenticate to get new toke because new token will generate each time when change email or password
        // avoid token expired
        await reauthenticate(currentPassword.current.value);
        promises.push(updateEmail(emailRef.current.value));
      }
      if (passwordRef.current.value) {
        // re authenticate to get new toke because new token will generate each time when change email or password
        // avoid token expired
        await reauthenticate(currentPassword.current.value);
        promises.push(updatePassword(passwordRef.current.value));
      }
      // check all promised are fulfilled
      await Promise.all(promises);
      navigate("/");
    } catch (error) {
      setError("Faild to Update Profile Try to log out and to Log in again");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </Form.Group>
            <Form.Group id="current-password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                ref={currentPassword}
                placeholder="Current Password"
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave it blank"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>New Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave it blank"
              />
            </Form.Group>
            <Button
              type="submit"
              disabled={loading}
              className="w-100 text-center mt-2"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
