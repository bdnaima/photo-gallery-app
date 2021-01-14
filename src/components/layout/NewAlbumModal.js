import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { db, timestamp } from '../../firebase/firebaseIndex';


const NewAlbumModal = ({urls, owner, dislikedUrls,disabled, label, message, placeholder}) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");

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
        
        const albumRef = db.collection('albums').doc()
        albumRef.set({
            title: title,
            owner: owner,
        }) 
        if (urls) {
            urls.forEach(url =>{
                db.collection('images').doc().set({
                    albumRef: albumRef,
                    createdAt: timestamp(),
                    url: url,
                })
            })
        }
        setShow(false);
    }

    return (
        <>
            <Button onClick={handleModal} disabled={disabled}>{label}</Button>
            <Modal 
                show={show} 
                onHide={handleClose} 
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{message}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <Form.Control 
                            value={title} 
                            onChange={handleChange} 
                            type="text"
                            placeholder={placeholder}
                            />
                    </FormGroup>
                    <FormGroup>
                        {urls && <p>Included photos</p>}
                        {urls && urls.map(url => (
                            <img src={url} alt="" style={{maxWidth:"4em"}} />
                        ))}
                    </FormGroup>
                    <FormGroup>
                        {dislikedUrls && <p>Not included photos</p>}
                        {dislikedUrls && dislikedUrls.map(url => (
                            <img src={url} alt="" style={{maxWidth:"4em"}} />
                        ))}
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    {urls && <p>Total photos: {urls.length}</p>}
                    <Button onClick={handleCreate}>{label}</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default NewAlbumModal;