import React, { useState, useContext } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebaseIndex';


const NewAlbumModal = ({urls}) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const user = useContext(AuthContext)

    const handleModal = () => {
        setTitle("");
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleCreate = () => {
        if (!title) return 
        db.collection('albums').doc().set({
            title: title,
            owner: user.uid,
        })
        setShow(false);
    }

    return (
        <>
            <Button onClick={handleModal}>Create New Album</Button>
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
                        value={title} 
                        onChange={handleChange} 
                        type="text"/>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleCreate}>Create</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default NewAlbumModal;