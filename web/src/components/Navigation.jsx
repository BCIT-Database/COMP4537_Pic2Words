import React from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.users || {});

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
  <Navbar bg="light" expand="lg" variant="light" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} className="fw-bold text-primary" style={{ cursor: 'pointer' }}>
          Pic2Words
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userInfo ? (
              <>
                <Nav.Link onClick={() => navigate('/image-upload')}>Upload</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
              </>
            )}
          </Nav>
          {userInfo && (
            <NavDropdown title={`Welcome, ${userInfo.email} (${userInfo.role})`} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default Navigation;
