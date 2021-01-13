import React, { useContext, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import Navigation from '../layout/Navigation';
import NewAlbumModal from '../layout/NewAlbumModal';
import albumCover from '../../assets/images/albumCover.jpg';
import { db } from '../../firebase/firebaseIndex';

const StyledCard = styled.div`
    background-color: #800080;
    color: white;
    border-radius: 2em;
    padding: 2em;

    &:hover {
        opacity: 0.5;
    }
`;
const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const user = useContext(AuthContext)

    useEffect(() => {
    //Fetch data from Firebase

        const unsubscribe = db.collection('albums')
        .orderBy('title', 'asc')
        .onSnapshot(snapshot => {

            const dummyAlbums = []

            snapshot.forEach(doc => {
                let data = doc.data()
                data.id = doc.id;
                dummyAlbums.push(data);
            });
            
            setAlbums(dummyAlbums);
        },)
        return unsubscribe;
}, []);
  



    if (user === null) {
        console.log("Signing in...")
        return <div>Signing in...</div>;
    }

    return (
        <>
           <Navigation />
                <h1 style={{textAlign:"center", fontFamily:"cursive", marginTop:"2em"}}>Albums</h1>
                
                <div style={{display:"flex", justifyContent:"center"}}>
                    <NewAlbumModal />
                </div>
               

                <section style={{display: 'flex', justifyContent: "space-evenly", flexWrap: "wrap", marginTop: "5em"}}>
                    {
                        albums.map(album => {
                
                            return  <Link to={`/albums/${album.id}`} key={album.id} style={{marginBottom: "2em", color: "white"}}>
                                        <StyledCard>
                                        <Card style={{ width: '18rem', borderColor: "#800080" }} key={album.id}>
                                            <Card.Img style={{ width: '18rem' }} variant="top" src={albumCover} />
                                            <Card.Body style={{background: "#800080"}}>
                                                <Card.Title>{album.title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        </StyledCard>
                                    </Link>
                            })
                    }
                </section>
            <footer>
               
            </footer>
    </>
    )
}

export default Albums;