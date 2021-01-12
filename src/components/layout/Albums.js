import React, { useContext, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navigation from '../layout/Navigation';
import NewAlbumModal from '../layout/NewAlbumModal';
import yoga from '../../assets/images/yoga.jpg';
import { db, auth } from '../../firebase/firebaseIndex';


const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const history = useHistory();
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
  
const handleClick = () => {
    auth.signOut().then(() => {
        history.push('/signin')
    })
  }


    if (user === null) {
        console.log("Signing in...")
        return <div>Signing in...</div>;
    }

    return (
        <>
            <Navigation />
                <h1>Albums</h1>
                <h2>{user.uid} Signed in!</h2>
                
                <section style={{display: 'flex', justifyContent: "space-evenly", flexWrap: "wrap"}}>
                    {
                        albums.map(album => {
                
                            return  <Link to={`/albums/${album.id}`} key={album.id} style={{marginBottom: "2em"}}>
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

                <button onClick={handleClick}>Sign out</button>
            <footer>
                <NewAlbumModal />
            </footer>
    </>
    )
}

export default Albums;