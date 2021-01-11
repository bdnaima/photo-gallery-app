import React, { useState, useEffect } from 'react';
import ProgressBar from './Progress';
import { db } from '../../firebase/firebaseIndex';
import { Card } from 'react-bootstrap';


const AlbumImages = () => {
    const [imageFile, setImageFile] = useState(null);
    const [error, SetError] = useState(null);
    const types = ['image/png', 'image/jpeg'];

    const [images, setImages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('images')
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
        
    }, [])


    const handleChange = (e) => {
        let selected = e.target.files[0];


        if(selected && types.includes(selected.type)) {
            setImageFile(selected);
            SetError("");
        } else {
            setImageFile(null);
            SetError('Please select an image file either png or jpeg');
        }
    }
        
    return (
        <>
            <h1>Images</h1>
            <form>
                <input type="file" onChange={handleChange}/>
                <div style={{backgroundColor: "lightPink", maxWidth: "30em"}}>
                    {error && <div style={{color: "red"}}>
                        {error}
                    </div>}
                    {imageFile && <div>{imageFile.name}</div>}
                    { imageFile  && <ProgressBar imageFile={imageFile} setImageFile={setImageFile}/> }
                </div>
            </form>

            <section>
                {images && images.map(doc => {
                    return  <Card style={{ width: '18rem' }} key={doc.id}>
                                <Card.Img variant="top" src={doc.url} />
                            </Card>
                })}
            </section>
        </>
    )
}

export default AlbumImages;
