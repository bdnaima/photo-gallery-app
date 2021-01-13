import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiCopyAlt } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseIndex';
import Navigation from '../layout/Navigation';
import UploadImage from '../layout/UploadImage';
import NewAlbumModal from '../layout/NewAlbumModal';

const StyledForm = styled.form`
form{
  margin: 30px auto 10px;
  text-align: center;
}
label input{
  height: 0;
  width: 0;
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

const AlbumImages = () => {
    const [imageFile, setImageFile] = useState(null);
    const { albumId } = useParams();
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]); 
    const [selectedImgs, setSelectedImgs] = useState({});
    const [copyLink, setCopyLink] = useState('');
    const [editName, setEditName] = useState('');
    const inputRef = useRef(null);
    const types = ['image/png', 'image/jpeg'];

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

    const handleSelectedImgs = (imageId) => {
        if (selectedImgs[imageId]) {
            delete selectedImgs[imageId]
            setSelectedImgs()
        }
    }

    const handleCopy = (e) => {
        inputRef.current.select();
        document.execCommand('copy');

        e.target.focus();
        setCopyLink('Copied!');
    }

    const handleEditName = (e) => {

        setEditName(e.target.value);
        
    }

    // const handleEditClick = () => {

    //     db.collection('albums')
    //     .where('title', '==', 'Alubm_2')
    //     .set({
    //         title: editName,
    //     });
    //     setEditName(editName);
    // }



    return (
        <>
            <Navigation />
            <h1 style={{fontFamily: "Cursive", textAlign:"center"}}>Images</h1>

            <StyledForm>
                <form>
                <label>
                    <input type="file" onChange={handleChange} multiple="mulitiple"/>
                    <span>+</span>
                </label>
                    <div style={{backgroundColor: "lightPink", maxWidth: "30em"}}>
                        {error && <div style={{color: "red"}}>
                            {error}
                        </div>}
                        {imageFile && <div>{imageFile.name}</div>}
                        { imageFile  && <UploadImage imageFile={imageFile} setImageFile={setImageFile} albumId={albumId}/> }
                    </div>
                </form>
            </StyledForm>

            <section style={{display: "Flex", justifyContent:"space-evenly", flexWrap:"wrap"}}>
                {images && images.map(image => {
                    return  <Card style={{ width: '18rem', marginBottom:"2em" }} key={image.id}>
                                <Card.Img variant="top" src={image.url} />
                                <input 
                                    type="checkbox"
                                    checked={ selectedImgs[image.id] ? true : false}
                                    onChange={() => handleSelectedImgs(image.id)} />
                            </Card>
                })}
            </section>
            <div style={{
                    display: "flex", 
                    flexDirection: "row-reverse", 
                    justifyContent:"center", 
                    flexWrap:"wrap",
                    marginTop:"2em"
                }}>
            {
                document.queryCommandSupported('copy') &&
                <div>
                <Button onClick={handleCopy}><BiCopyAlt/></Button> 
                {copyLink}
                </div>
            }   
                <input 
                    id="margin-left" 
                    style={{marginLeft:"2em"}}
                    ref={inputRef} 
                    type="text" 
                    value="http://localhost:3000/albums/NQL9oUZhE7ZODmZxA377" 
                /> 
                <input type="text" onChange={handleEditName} />
                <Button onClick="handleEditClick"><AiOutlineEdit /></Button>
            </div>
           
            <div style={{display: "flex", justifyContent:"center", marginTop:"2em", marginBottom:"2em"}}>
                <NewAlbumModal />
            </div>
        </>
    )
}


export default AlbumImages;
