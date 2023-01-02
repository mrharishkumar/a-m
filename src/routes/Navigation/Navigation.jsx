import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import "./Navigation.scss";

import authService from "../../services/auth.service";
import { toast } from "react-toastify";

const Navigation = () => {
  const currentLocation = useLocation().pathname;

  const navigate = useNavigate();

  const handelLogout = async () => {
    authService.logout();
    toast("Logged out successfully.");
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
              <span className="fst-italic text-capitalize text-light pt-1" style={{"fontSize":"16px"}}>
                Welcome !  {authService.getUserName().toLowerCase()}
              </span>
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
