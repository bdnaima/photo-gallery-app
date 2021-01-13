import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseIndex';

 const Customer =() => {
    const [images, setImages] = useState([]); 
    const [imageFile, setImageFile] = useState(null);
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

    return (
        <>
             <form>
                <div style={{backgroundColor: "lightPink", maxWidth: "30em"}}>
                    {error && <div style={{color: "red"}}>
                        {error}
                    </div>}
                    {imageFile && <div>{imageFile.name}</div>}
                    { imageFile  && <UploadImage imageFile={imageFile} setImageFile={setImageFile} albumId={albumId}/> }
                </div>
            </form>
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
        </>
    )
}

export default Customer
