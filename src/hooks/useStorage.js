import { useState, useEffect } from 'react';
import { storage, db, timestamp, } from '../firebase/firebaseIndex';

const useStorage = (file, albumId) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        //references
        const storageRef = storage.ref(Date.now() + '_', file.name)
        const collectionRef = db.collection('images');

        // set progress, error and imageURL inside upload progress
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage)
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const albumRef = db.collection('albums').doc(albumId);
            const createdAt = timestamp();
            collectionRef.add({url, createdAt, albumRef});
            setImageURL(url);
        })
    }, [file, albumId])

    return { progress, imageURL, error }
}

export default useStorage;