import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../../firebase/firebaseIndex';


const Signin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        auth.signInWithEmailAndPassword(emailValue, passwordValue);

    }
    return (
        <div className="container">
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
    )
}

export default Signin;