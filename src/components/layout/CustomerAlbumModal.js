import React, { useState, useContext } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebaseIndex';


const NewAlbumModal = () => {
    const [newAlbum, setNewAlbum] = useState("");
    const [show, setShow] = useState(false);
    const user = useContext(AuthContext)


    const handleModal = () => {
        setShow(true);
    }

    const handleClose = () => {
        setNewAlbum("");
        setShow(false);
    
    }

    const handleChange = (e) => {
        setNewAlbum(e.target.value);
    }

    const handleOrder = () => {
        if (!newAlbum) return 
        db.collection('albums').doc(newAlbum).set({
            title: newAlbum,
            owner: user.uid,
        })
        setNewAlbum("");
        setShow(false);
    }
    return (
        <>
            <Button onClick={handleModal}>Order Images</Button>

            <Modal 
                show={show} 
                onHide={handleClose} 
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your name</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <Form.Control 
                            value={newAlbum} 
                            onChange={handleChange} 
                            type="text"
                            placeholder="Your name"
                        />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleOrder}>Order Album</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewAlbumModal;