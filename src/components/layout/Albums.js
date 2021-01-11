import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseIndex';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navigation from '../layout/Navigation';
import { Card } from 'react-bootstrap';
import NewAlbumModal from '../layout/NewAlbumModal';
import yoga from '../../assets/images/yoga.jpg';


const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const user = useContext(AuthContext)

    useEffect(() => {
    //Fetch data from Firebase

        const unsubscribe = db.collection('albums')
        .orderBy('title', 'desc')
        .onSnapshot(snapshot => {

            const dummyAlbums = []

            snapshot.forEach(doc => {
                let data = doc.data()
                data.id = doc.id;
                dummyAlbums.push(data);
            });
            
            setAlbums(dummyAlbums);

            console.log(dummyAlbums)
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
                <h1>Albums</h1>
                <h2>{user.uid} Signed in!</h2>
                
                <section style={{display: 'flex', justifyContent: "space-evenly"}}>
                    {
                        albums.map(album => {
                
                           return  <Link to={`/albums/${album.id}`} key={album.id}>
                                        <Card style={{ width: '18rem' }} key={album.id}>
                                            <Card.Img style={{ width: '18rem' }} variant="top" src={yoga} />
                                            <Card.Body>
                                                <Card.Title>{album.title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                            })
                    }
                </section>

                <footer>
                    <NewAlbumModal />
                </footer>
        </>
    )
}

export default Albums;