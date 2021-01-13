import React from 'react'
import * as ReactBootStrap from 'react-bootstrap';
import { auth } from '../../firebase/firebaseIndex';

const Navigation = () => {

  const handleClick = () => {
    auth.signOut()
  }

  return (
    <>
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" variant="light">
        <ReactBootStrap.Navbar.Brand href="/albums">Gallery</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav> 
          <a style={{color: "black"}} href="/signin" onClick={handleClick}>Sign out</a>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </>

    );
  }
  
  export default Navigation;