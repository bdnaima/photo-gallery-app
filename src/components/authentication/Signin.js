import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Signin = () => {
    return (
        <div className="container">
            <h1>Photo Gallery</h1>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
</Form>
        </div>
    )
}

export default Signin;