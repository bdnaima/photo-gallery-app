import React, { useState, useEffect } from 'react';
import { Card, Button, Jumbotron, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseIndex';
import NewAlbumModal from '../layout/NewAlbumModal';

const StyledBody = styled.body`
    background-color: lightgray;
`

 const Customer =() => {
    const [images, setImages] = useState([]); 
    const [ title, setTitle ] = useState('');
    const { albumId } = useParams();

    useEffect(() => {
        const unsubscribe = db.collection('images')
            .where('albumRef', '==', db.collection('albums').doc(albumId))
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {

            const documents = [];

            snapshot.forEach(doc => {
                let data = doc.data();
                data.id = doc.id
                documents.push(data);
            })
            setImages(documents);
        });
        
        //Unsubscribe from the collection when we are no longer using it.
        return unsubscribe;
        
    }, [albumId]);

    useEffect(() => {
        const unsubscribe = db.collection('albums').doc(albumId).onSnapshot(snapshot => {
           const title = snapshot.data().title
           setTitle(title);
        });

        return unsubscribe;
    }, [albumId])


    const handleLike = () => {

    }

    const handleUnLike = () => {

    }

    return (
        <>
            <StyledBody>
                <Jumbotron fluid>
                    <Container>
                        <h1 style={{color: "lightgray", fontFamily: "cursive"}}>Creating for everyone</h1>
                    </Container>
                </Jumbotron>
                <h1 style={{fontFamily: "Cursive", textAlign:"center"}}>{title}</h1>
                <section style={{
                            display: "Flex", 
                            justifyContent:"space-evenly", 
                            flexWrap:"wrap",
                            marginTop:"3em"}}>
                {images && images.map(image => (
                    <Card style={{ width: '18rem', marginBottom:"2em" }} key={image.id}>
                        <div style={{display: "flex", backgroundColor: "lightgray"}}>
                            <Button style={{marginRight:"1em"}} onClick={handleLike}><AiFillLike /></Button> 
                            <Button onClick={handleUnLike}><AiFillDislike /></Button>
                        </div> 
                        <Card.Img variant="top" src={image.url} />
                    </Card>
                ))}
                </section>
                <div style={{display: "flex", justifyContent:"flex-end", marginRight:"1em"}}>
                <NewAlbumModal 
                    label="Order" 
                    message="Order album with these photos" 
                    placeholder="Enter your name"/>
                </div>
            </StyledBody>
        </>
    )
}

export default Customer
