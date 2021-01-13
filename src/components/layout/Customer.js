import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseIndex';
import CustomerAlbumModal from './CustomerAlbumModal';

 const Customer =() => {
    const [images, setImages] = useState([]); 
    const [selectedImgs, setSelectedImgs] = useState({});
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

    const handleSelectedImgs = (imageId) => {
        if (selectedImgs[imageId]) {
            delete selectedImgs[imageId]
            setSelectedImgs()
        }
    }

    const handleLike = () => {

    }

    const handleUnLike = () => {

    }



    return (
        <>
            <h1 style={{fontFamily: "Cursive", textAlign:"center"}}>{title}</h1>
            <section style={{display: "Flex", justifyContent:"space-evenly", flexWrap:"wrap"}}>
            {images && images.map(image => (
                <Card style={{ width: '18rem', marginBottom:"2em" }} key={image.id}>
                    <div style={{display: "flex"}}>
                        <Button style={{marginRight:"1em"}} onClick={handleLike}><AiFillLike /></Button> 
                        <Button onClick={handleUnLike}><AiFillDislike /></Button>
                    </div> 
                    <Card.Img variant="top" src={image.url} />
                </Card>
            ))}
            </section>
            <CustomerAlbumModal />
        </>
    )
}

export default Customer
