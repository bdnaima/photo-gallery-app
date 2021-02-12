import React, { useState, useEffect } from 'react';
import { Card, Button, Jumbotron, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { SRLWrapper } from "simple-react-lightbox";
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseIndex';
import NewAlbumModal from '../layout/NewAlbumModal';

const StyledBody = styled.div`
    background-color: lightgray;
`

 const Customer =() => {
    const [images, setImages] = useState([]); 
    const [ title, setTitle ] = useState('');
    const [ owner, setOwner ] = useState();
    const [likes, setLikes] = useState({})
    const [dislikes, setDislikes] = useState({});
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
            const data = snapshot.data()
            setTitle(data.title);
            setOwner(data.owner);
        });

        return unsubscribe;
    }, [albumId])


    const handleLike = (image) => {
        const newLikes = {...likes}
        newLikes[image.id] = image.url
        setLikes(newLikes)

        const newDislikes = {...dislikes}
        delete newDislikes[image.id]
        setDislikes(newDislikes)
    }

    const handleDislike = (image) => {
        const newDislikes = {...dislikes}
        newDislikes[image.id] = image.url
        setDislikes(newDislikes)

        const newLikes = {...likes}
        delete newLikes[image.id]
        setLikes(newLikes)
    }

    const likedUrls = Object.values(likes);
    const dislikedUrls = Object.values(dislikes);

    return (
        <>
            <StyledBody>
                <Jumbotron fluid>
                    <Container>
                        <h1 style={{color: "lightgray", fontFamily: "cursive"}}>Creating for everyone</h1>
                    </Container>
                </Jumbotron>
                <h1 style={{fontFamily: "Cursive", textAlign:"center"}}>{title}</h1>
                <div style={{display: "flex", justifyContent:"flex-end", marginRight:"1em"}}>
                    <NewAlbumModal 
                        disabled={likedUrls.length + dislikedUrls.length === images.length ? false : true}
                        label="Order" 
                        owner={owner}
                        urls={likedUrls}
                        dislikedUrls={dislikedUrls}
                        message="Order album with these photos" 
                        placeholder="Enter your name"/>
                </div>
                <SRLWrapper>
                    <section 
                        style={{
                            display: "Flex", 
                            placeContent: "flex-start", 
                            flexWrap:"wrap",
                            marginTop:"3em"}}>
                    {images && images.map(image => (
                        <Card style={{ width: '18rem', marginBottom:"2em", margin: "1em"}} key={image.id}>
                            <div style={{display: "flex", backgroundColor: "lightgray"}}>
                                <Button
                                    variant={likes[image.id] ? "success" : "light"}
                                    style={{marginRight:"1em"}}
                                    onClick={() => handleLike(image)}>
                                    <AiFillLike />
                                </Button> 
                                <Button
                                    variant={dislikes[image.id] ? "danger" : "light"}
                                    onClick={() => handleDislike(image)}>
                                    <AiFillDislike />
                                </Button>
                            </div> 
                            <a href={image.url} title="View image in lightbox" data-attribute="SRL">
                                <Card.Img variant="top" src={image.url} />
                            </a>
                        </Card>
                    ))}
                    </section>
                </SRLWrapper>
            </StyledBody>
        </>
    )
}

export default Customer
