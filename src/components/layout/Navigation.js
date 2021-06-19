import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseIndex';
import { AuthContext } from '../../contexts/AuthContext';

const Navigation = () => {
  const user = useContext(AuthContext)

  const handleClick = () => {
    auth.signOut()
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Link to="/">
          <Navbar.Brand style={{ color: "purple", fontSize: "20px" }} className="textFont">Stunning Gallery</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
        </Nav>
        {user && <Navbar.Text>{`${user && user.email} |`}</Navbar.Text>}
        <Nav>
          {user && <Link to="/" style={{ color: "purple" }} onClick={handleClick}>Sign out</Link>}
        </Nav>
        <Nav>
          {!user && <Link to="/signin" style={{ color: "purple" }}>Sign in</Link>}
        </Nav>
      </Navbar>
    </>

  );
}

export default Navigation;