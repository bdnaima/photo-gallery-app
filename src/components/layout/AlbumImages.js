import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseIndex';
import UploadImage from '../layout/UploadImage';

const AlbumImages = () => {
    const [imageFile, setImageFile] = useState(null);
    const { albumId } = useParams();
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]); 
    const [selectedImgs, setSelectedImgs] = useState({});
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



    return (
        <>
            <h1>Images</h1>
            <form>
                <input type="file" onChange={handleChange} multiple="mulitiple"/>
                <div style={{backgroundColor: "lightPink", maxWidth: "30em"}}>
                    {error && <div style={{color: "red"}}>
                        {error}
                    </div>}
                    {imageFile && <div>{imageFile.name}</div>}
                    { imageFile  && <UploadImage imageFile={imageFile} setImageFile={setImageFile} albumId={albumId}/> }
                </div>
            </form>

            <section>
                {images && images.map(image => {
                    return  <Card style={{ width: '18rem' }} key={image.id}>
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


export default AlbumImages;
