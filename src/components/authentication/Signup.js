import React, { useRef, useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseIndex';
import styled from 'styled-components';
import purpleBackground from '../../assets/images/purpleBackground.jpg'

const StyledForm = styled.form`
    background-color: #800080;
    color: white;
    border-radius: 2em;
    opacity: 0.5;
    padding: 40px;

    &:hover {
        opacity: 1;
    }
`;

const StyledBody = styled.div`
    background-image: url(${purpleBackground});
    background-size: 90rem;
`


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Signing in user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        const passwordConfirmValue = passwordConfirmRef.current.value

        if (passwordValue !== passwordConfirmValue) {
            return setError('Passwords do not match! Please try again.')
        }

        try {
            setError('');
            setLoading(true);
            const unsubscribe = await auth.createUserWithEmailAndPassword(emailValue, passwordValue);

            return unsubscribe;
        } catch {
            setError("Failed to create an account.")
        }
        setLoading(false);
    }

    return (
        <>
            <Navbar>
                <Link to="/">
                    <Navbar.Brand className="textFont" style={{ color: "purple" }}>Stunning Gallery</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Link to="/signin" style={{ color: "purple" }}>Sign in</Link>
                </Nav>
            </Navbar>
            <StyledBody>
                <h1 style={{ textAlign: "center", color: "white", paddingTop: "4rem" }}>Sign up to create your gallery</h1>
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "80vh" }}>
                    <div
                        className="w-100"
                        style={{
                            maxWidth: "400px",
                            boxShadow: "1px 2px 5px 8px indigo",
                            borderRadius: "2em"
                        }}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <StyledForm onSubmit={handleSubmit}>
                            <h1>Sign Up</h1>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordConfirmRef}
                                    placeholder="Confirm password" />
                            </Form.Group>
                            <Button
                                className="w-100"
                                type="submit"
                                style={{ boxShadow: " 1px 1px 2px 1px black" }}
                                disabled={loading}>
                                Sign up
                    </Button>

                            <div className="w-100 text-center mt-2">
                                Already have an account? <Link to="/signin" style={{ color: "white" }}>Sign in</Link>
                            </div>
                        </StyledForm>
                    </div>
                </Container>
            </StyledBody>
        </>
    )
}

export default Signup;