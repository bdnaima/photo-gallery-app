import React, { useContext } from 'react'
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom'
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
        <Link to="/albums">
          <ReactBootStrap.Navbar.Brand style={{color: "purple"}}>Gallery</ReactBootStrap.Navbar.Brand>
        </Link>
          <ReactBootStrap.Nav className="mr-auto">
          </ReactBootStrap.Nav>
          <ReactBootStrap.Navbar.Text>{`${user && user.email} |`}</ReactBootStrap.Navbar.Text>
          <ReactBootStrap.Nav> 
            <Link to="/signin" style={{color: "purple"}} onClick={handleClick}>Sign out</Link>
          </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar>
    </>

    );
  }
  
  export default Navigation;