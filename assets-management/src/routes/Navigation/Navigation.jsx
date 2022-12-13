import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import "./Navigation.scss";

import { Button } from "react-bootstrap";
import authService from "../../services/auth.service";

const Navigation = () => {
  const currentLocation = useLocation().pathname;

  const navigate = useNavigate();

  const handelLogout = async () => {
    authService.logout();
    navigate("/");
  };

  return (
    <div className="Navigation">
      {currentLocation !== "/" && (
        <Navbar className="Navbar">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                className="logo top-heading"
                href="/MyDevice"
                src="assets/images/impressico-logo.png"
                alt="logo"
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <NavLink to="/home">
                <span className="Navlink">Home</span>
              </NavLink>

              <NavLink to="/my_device">
                <span className="Navlink">My Devices</span>
              </NavLink>
            </Nav>
            <Nav>
              <Button onClick={handelLogout}>
                <span className="Navlink">Logout</span>
              </Button>
            </Nav>
          </Container>
        </Navbar>
      )}
      <Outlet />
    </div>
  );
};

export default Navigation;
