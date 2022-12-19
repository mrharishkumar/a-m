import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "./Navigation.scss";
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
            <Nav className="me-auto">
              <NavLink to="/home">
                <span className="Navlink">
                  <AiFillHome className="fs-4" />
                </span>
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="/my_device">
                <span className="Navlink fst-italic">My Device's</span>
              </NavLink>
              <span className="Navlink fst-italic" onClick={handelLogout}>
                  Logout
              </span>
            </Nav>
          </Container>
        </Navbar>
      )}
      <Outlet />
    </div>
  );
};

export default Navigation;
