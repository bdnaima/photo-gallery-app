import React, { useContext } from 'react'
import * as ReactBootStrap from 'react-bootstrap';
import { auth } from '../../firebase/firebaseIndex';
import { AuthContext } from '../../contexts/AuthContext';

const Navigation = () => {
  const user = useContext(AuthContext)

  const handleClick = () => {
    auth.signOut()
  }

  return (
    <>
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" variant="light">
        <ReactBootStrap.Navbar.Brand style={{color: "purple"}} href="/albums">Gallery</ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Nav className="mr-auto">
          </ReactBootStrap.Nav>
          <ReactBootStrap.Navbar.Text>{`${user.email} |`}</ReactBootStrap.Navbar.Text>
          <ReactBootStrap.Nav> 
            <a style={{color: "purple"}} href="/signin" onClick={handleClick}>Sign out</a>
          </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar>
    </>

    );
  }
  
  export default Navigation;