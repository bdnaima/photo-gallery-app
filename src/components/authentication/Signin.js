import React, { useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../../firebase/firebaseIndex';


const Signin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Signing in user
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        auth.signInWithEmailAndPassword(emailValue, passwordValue);

    }
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h1>Photo Gallery</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" ref={ emailRef } placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={ passwordRef } placeholder="Password" />
                    </Form.Group>

                    <Button 
                        className="w-100" 
                        type="submit" 
                        style={{ backgroundColor: "purple" }}
                        >
                        Sign in
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default Signin;