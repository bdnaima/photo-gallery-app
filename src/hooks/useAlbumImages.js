import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseIndex';

const useAlbumImages = (albumId) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('images')
            .where('album', '==', db.collection('albums').doc(albumId))
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {

                const albumImgs = [];
                snapshot.forEach(doc => {
                    let data = doc.data();
                    data.id = doc.id
                    albumImgs.push(data);
                });
                setImages(albumImgs);
            });
        return unsubscribe;
    }, [albumId]);
        
    return { images }
}

export default useAlbumImages
