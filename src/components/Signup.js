import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useNode } from "../context/NodeContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const { getNode } = useNode();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const  node =  getNode(emailRef.current.value);
    // return  "";
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password does not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const response = await signup(emailRef.current.value, passwordRef.current.value);
      console.log(response)
      if(response.status >=300 ){
        setError(response.message)
      } else{
        // const  node =  getNode(emailRef);
        // navigate("/");
      }
    } catch (error) {
      setError("Faild to create an Account");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              type="submit"
              disabled={loading}
              className="w-100 text-center mt-2"
            >
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
