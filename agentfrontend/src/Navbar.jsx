import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css'; 

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          src="/logo.png"
          height="30"
          className="d-inline-block align-top"
          alt="TownManor logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#search-property">Search Property</Nav.Link>
          <Nav.Link href="#home-loan">Home Loan</Nav.Link>
          <Nav.Link href="#home-interior">Home Interior</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="outline-secondary" className="mr-4">Sign in</Button>
          <Button variant="danger">Property Listing Powered By AI</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
