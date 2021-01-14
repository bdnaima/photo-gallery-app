import React, { useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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

const StyledBody = styled.body`
    background-image: url(${purpleBackground});
`


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
        <StyledBody>
             <div style={{display: "flex", justifyContent:"flex-end"}}>
                <Button><a style={{color: "white"}} href="/signup">Sign Up</a></Button>
            </div>
            <Container 
                className="d-flex align-items-center justify-content-center" 
                style={{ minHeight: "100vh" }}>
                <div 
                className="w-100" 
                style={{
                    maxWidth: "400px", 
                    boxShadow: "1px 2px 5px 8px indigo", 
                    borderRadius:"2em" 
                }}>
                <StyledForm onSubmit={handleSubmit}>
                    <h1>Sign In</h1>               
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                ref={ emailRef } 
                                placeholder="Enter email" />
                        </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            ref={ passwordRef } 
                            placeholder="Password" />
                    </Form.Group>
                    <Button 
                        className="w-100" 
                        type="submit"
                        style={{boxShadow:" 1px 1px 2px 1px black"}}>
                    Sign in
                    </Button>               
                </StyledForm>
            </div>
        </Container>
    </StyledBody>
    )
}

export default Signin;