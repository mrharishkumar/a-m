import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

import "./Login.scss";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
    errorMessage: "",
  };

  const [formFields, setFormFields] = useState(defaultValues);

  const { username, password, errorMessage } = formFields;

  const field = useRef();

  const setFocus = () => {
    field.current && field.current.focus();
  };

  useEffect(() => setFocus, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .login(username, password)
      .then(() => {
        navigate("/home", { replace: true });
        toast("You are now logged in.");
      })
      .catch((error) => {
        console.log(error);
        setFocus();
        setFormFields({
          ...formFields,
          password: "",
          errorMessage: "Check username/password.",
        });
      });
  };

  return (
    <div className="Login pt-5 ">
      <Row className="justify-content-center pt-5">
        <Col xs={8} md={5} lg="4" className="px-5">
          <Form className="p-5" onSubmit={handleSubmit} autoComplete="false">
            <Row className="justify-content-md-center">
              <img
                src="./assets/images/ibs-logo-big.png"
                alt="logo"
                className="logo"
              />
              <div className="text-center fst-italic text-bold">
                <h2 className="fs-5 pt-3 text-upper fw-bold">
                  {" "}
                  Sign in to Asset Management
                </h2>
                <p className="text-secondary">Enter your details below</p>
              </div>
            </Row>
            <Form.Group controlId="username">
              <Form.Label className="label">Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                ref={field}
                value={username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </Form.Group>
            {errorMessage && <div className="error pt-2">{errorMessage}</div>}
            <Row className="justify-content-md-center px-3">
              <Button className="btn py-2 mt-4" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
