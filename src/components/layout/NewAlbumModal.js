import React, { useState, useContext } from 'react';
import { db } from '../../firebase/firebaseIndex';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';


const NewAlbumModal = () => {
    const [show, setShow] = useState(false);
    const [newAlbum, setNewAlbum] = useState("");
    const user = useContext(AuthContext)

    const handleModal = () => {
        setShow(true);
    }

    const handleClose = () => {
        if(!newAlbum) {
            return
        }
        db.collection('albums').doc(newAlbum).set({
            title: newAlbum,
            owner: user.uid,
        })
        setNewAlbum("");
        setShow(!true);
    }

    const handleChange = (e) => {
        setNewAlbum(e.target.value);
    }
    return (
        <>
            <Button 
                onClick={handleModal}>
            Create New Album
            </Button>

            <Modal 
                show={show} 
                onHide={handleClose} 
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new album</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <Form.Control 
                        value={newAlbum} 
                        onChange={handleChange} 
                        type="text"/>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        onClick={handleClose} 
                    >
                    Create
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default NewAlbumModal;