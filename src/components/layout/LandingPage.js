import React, { useContext } from 'react';
import { CardGroup, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import forest from '../../assets/images/forest.jpg';
import beach from '../../assets/images/beach.jpg';
import greenForest from '../../assets/images/green-forest.jpg';
import mountains from '../../assets/images/mountains.jpg';
import yoga from '../../assets/images/nature-yoga.jpg';
import waterfall from '../../assets/images/waterfall.jpg';
import drop from '../../assets/images/drop.jpg';
import butterflies from '../../assets/images/butterflies.jpg';
import garden from '../../assets/images/garden.jpg';

import { AuthContext } from '../../contexts/AuthContext';


const LandingPage = () => {
    const user = useContext(AuthContext);

    return (
        <>
            <Navigation />
            <Container>
                <h1 className="textFont">Sign up to create your own stunning gallery</h1>
                {user && <Link to="/albums" style={{ color: "purple" }}>Back to your albums</Link>}
                <CardGroup>
                    <Row>
                        <Col><Card.Img variant="top" src={forest} /></Col>
                        <Col><Card.Img variant="top" src={beach} /></Col>
                        <Col><Card.Img variant="top" src={greenForest} /></Col>
                    </Row>

                    <Row>
                        <Col><Card.Img variant="top" src={mountains} /></Col>
                        <Col><Card.Img variant="top" src={yoga} /></Col>
                        <Col><Card.Img variant="top" src={waterfall} /></Col>
                    </Row>

                    <Row>
                        <Col><Card.Img variant="top" src={drop} /></Col>
                        <Col><Card.Img variant="top" src={butterflies} /></Col>
                        <Col><Card.Img variant="top" src={garden} /></Col>
                    </Row>
                </CardGroup>
            </Container>
        </>

    );
}

export default LandingPage;