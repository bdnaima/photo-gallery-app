import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseIndex';
import { Card, Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import Navigation from '../layout/Navigation';
import NewAlbumModal from '../layout/NewAlbumModal';
import albumCover from '../../assets/images/albumCover.jpg';

const StyledCard = styled.div`
    background-color: #800080;
    color: white;

    &:hover {
        opacity: 0.5;
    }
`;

const StyledBody = styled.div`
    background-color: lightgray;
`

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const user = useContext(AuthContext)

    useEffect(() => {
        if (!user) return
        const unsubscribe = db.collection('albums').where('owner', '==', user.uid)
            .orderBy('title', 'asc')
            .onSnapshot(snapshot => {

                const dummyAlbums = []

                snapshot.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id;
                    dummyAlbums.push(data);
                });

                setAlbums(dummyAlbums);
            })
        return unsubscribe;
    }, [user]);

    if (user === null) {
        return <div>Signing in...</div>;
    }

    return (
        <>
            <Navigation />
            <StyledBody>
                <Jumbotron fluid>
                    <Container>
                        <h1 style={{ color: "lightgray", fontFamily: "cursive" }}>Creating for everyone</h1>
                    </Container>
                </Jumbotron>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <NewAlbumModal
                        owner={user && user.uid}
                        label="Create Album"
                        message="Create a new empty album"
                        placeholder="Enter name"
                    />
                </div>

                <h1 style={{
                    textAlign: "center",
                    fontFamily: "cursive",
                    marginTop: "1em"
                }}>
                    Your Albums
                </h1>
                <section style={{
                    display: 'flex',
                    flexWrap: "wrap"
                }}>
                    {
                        albums.map(album => (
                            <Link
                                to={`/albums/${album.id}`}
                                key={album.id}
                                style={{ marginBottom: "2em", color: "white", margin: "1em" }}>
                                <StyledCard>
                                    <Row style={{ width: '18rem', borderColor: "#800080" }} key={album.id}>
                                        <Col>
                                            <Card.Img variant="top" src={albumCover} />
                                            <Card.Body style={{ background: "#800080" }}>
                                                <Card.Title className="textFont">{album.title}</Card.Title>
                                            </Card.Body>
                                        </Col>

                                    </Row>
                                </StyledCard>
                            </Link>
                        ))
                    }
                </section>
            </StyledBody>
        </>
    )
}

export default Albums;