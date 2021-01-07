import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'

const Navigation = () => {
  return (
    <>
        <ReactBootStrap.Navbar 
        collapseOnSelect expand="lg" 
        bg="dark" 
        variant="dark">
        <ReactBootStrap.Navbar.Brand href="#home">Photo Gallery</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <ReactBootStrap.Nav.Link href="/signin">Sign In</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link eventKey={2} href="/Sign Up">Sign Up</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </>

    );
  }
  
  export default Navigation;