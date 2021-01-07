import React, { useRef }  from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Password" />
                    </Form.Group>

                    <Button className="w-100" type="submit" style={{ backgroundColor: "purple" }}>
                        Sign up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
