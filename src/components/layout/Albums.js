import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseIndex';
import { AuthContext } from '../../contexts/AuthContext';
import Navigation from '../layout/Navigation';
import { Card } from 'react-bootstrap';
import NewAlbumModal from '../layout/NewAlbumModal';
import yoga from '../../assets/images/yoga.jpg';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const user = useContext(AuthContext)
   

    console.log("RENDER")

    useEffect(() => {
    //Fetch data from Firebase

        db.collection('albums').get().then(snapshot => {

            const dummyAlbums = []

            snapshot.forEach(doc => {
                let data = doc.data()
                data.id = doc.id;
                dummyAlbums.push(data);
            });
            
            setAlbums(dummyAlbums);
                
        },)
         
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

                <section>
                    {
                        albums.map(album => {
                
                           return  <Card style={{ width: '18rem' }} key={album.id}>
                                        <Card.Img style={{ width: '18rem' }} variant="top" src={yoga} />
                                        <Card.Body>
                                            <Card.Title>{album.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
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