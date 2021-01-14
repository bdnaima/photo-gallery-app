import React, { useState, useEffect } from 'react';
import { Card, Button, Jumbotron, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseIndex';
import Navigation from '../layout/Navigation';
import UploadImage from '../layout/UploadImage';
import NewAlbumModal from '../layout/NewAlbumModal';
import ShareModal from './ShareModal';

const StyledForm = styled.form`
form {
  margin: 30px auto 10px;
  text-align: center;
}
label input{
  height: 0;
  width: 10px;
  opacity: 0;
}
label{
  display: block;
  width: 40px;
  height: 40px;
  border: 2px solid purple;
  border-radius: 50%;
  margin: 10px auto;
  line-height: 28px;
  color: #4B0082;
  font-weight: bold;
  font-size: 24px;
}
label:hover{
  background: purple;
  color: white;
}
`;

const StyledBody = styled.div`
    background-color: lightgray;
`

const AlbumImages = () => {
    const [imageFile, setImageFile] = useState(null);
    const { albumId } = useParams();
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]); 
    const [selectedImgs, setSelectedImgs] = useState({});
    const [ title, setTitle ] = useState('');
    const [ owner, setOwner ] = useState();
    const types = ['image/png', 'image/jpeg'];

    //Get Images
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

    // Editing Album Name
    useEffect(() => {
        const unsubscribe = db.collection('albums').doc(albumId).onSnapshot(snapshot => {
            const data = snapshot.data()
            setTitle(data.title);
            setOwner(data.owner);
        });

        return unsubscribe;
    }, [albumId])


    const handleChange = (e) => {
        let selected = e.target.files[0];


        if(selected && types.includes(selected.type)) {
            setImageFile(selected);
            setError("");
        } else {
            setImageFile(null);
            setError('Please select an image file either png or jpeg');
        }
    }

    const handleSelectedImgs = (image) => {
        const newSelectedImgs = {}
        Object.assign(newSelectedImgs, selectedImgs)
        if (selectedImgs[image.id]) {
            delete newSelectedImgs[image.id]
        } else {
            newSelectedImgs[image.id] = image.url
        }

        setSelectedImgs(newSelectedImgs)
    }    

    const handleEdit = () => {
        const newTitle = window.prompt("Edit Album Name", title)

        if (!newTitle) return
        db.collection('albums').doc(albumId)
            .set({title: newTitle}, {merge: true}  )

    }

    const selectedUrls = Object.values(selectedImgs)

    return (
        <>
            <Navigation />
            <StyledBody>
                <Jumbotron fluid>
                    <Container>
                        <h1 style={{color: "lightgray", fontFamily: "cursive"}}>Creating for everyone</h1>
                    </Container>
                </Jumbotron>
                <h1 style={{fontFamily: "Cursive", textAlign:"center"}}>{title}</h1>
                

                <StyledForm>
                    <label>
                        <input 
                            onChange={handleChange}
                            type="file" 
                            multiple="mulitiple"/>
                        <span>+</span>
                    </label>
                    <div style={{
                            display: "flex", 
                            justifyContent: "space-evenly"
                            }}>
                        <Button  onClick={handleEdit}>Edit album</Button>
                        <ShareModal />
                        <NewAlbumModal
                            owner={owner}
                            label="Create Album" 
                            message="Create a new album with these photos" 
                            placeholder="Enter name" 
                            urls={selectedUrls} 
                            disabled={selectedUrls.length == 0} />
                    </div>
                    <div style={{backgroundColor: "lightPink", maxWidth: "30em"}}>
                        {error && <div style={{color: "red"}}>
                            {error}
                        </div>}
                        {imageFile && <div>{imageFile.name}</div>}
                        { imageFile  && <UploadImage imageFile={imageFile} setImageFile={setImageFile} albumId={albumId}/> }
                    </div>
                </StyledForm>

                <section style={{
                            display: "Flex", 
                            justifyContent: "space-evenly", 
                            flexWrap: "wrap",
                            marginTop: "2em"}}>
                    {images && images.map(image => (
                        <Card
                            style={{ 
                                width: '18rem', 
                                marginBottom:"2em", border: selectedImgs[image.id] ? "4px solid purple" : "none" }}
                            key={image.id}
                            onClick={() => handleSelectedImgs(image)}>
                            <input 
                                type="checkbox"
                                style={{position: 'absolute'}}
                                checked={ selectedImgs[image.id] ? true : false}
                                onChange={() => handleSelectedImgs(image)} />
                            <Card.Img variant="top" src={image.url} />
                        </Card>
                    ))}
                </section>
            </StyledBody>
        </>
    )
}


export default AlbumImages;
