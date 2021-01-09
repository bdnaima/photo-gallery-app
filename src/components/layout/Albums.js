import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseIndex';
import { AuthContext } from '../../contexts/AuthContext';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';

const Albums = () => {
    const [albums, setAlbums] = useState([]);

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
                
        }, [])
         
    });


    const user = useContext(AuthContext)
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleModal = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(!true);
    }

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
        <div>
            <h1>Albums</h1>
            <h2>{user.uid} Signed in!</h2>

            <ul>
                { albums.map((album) => {
                    return <li key={album.id}>{album.title}</li>
                }) }
            </ul>

            <Button onClick={handleModal}>Create New Album</Button>

            {/* Modal popup for creating new album */}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new album</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <FormGroup>
                    <Form.Control type="text"/>
                </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Create</Button>
                </Modal.Footer>

            </Modal>

            <button onClick={handleClick}>Sign out</button>
        </div>
    )
}

export default Albums;