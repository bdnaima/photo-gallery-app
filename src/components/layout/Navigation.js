import React from 'react'
import * as ReactBootStrap from 'react-bootstrap';
import { auth } from '../../firebase/firebaseIndex';
import { useHistory } from 'react-router-dom';


const Navigation = () => {
  const history = useHistory();
  
  const handleClick = () => {
      auth.signOut().then(() => {
          history.push('/signin')
      })
    }



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
            <button onClick={handleClick}>Sign out</button>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </>

    );
  }
  
  export default Navigation;