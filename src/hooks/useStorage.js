import { useState, useEffect } from 'react';
import { storage, db, timestamp } from '../firebase/firebaseIndex';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        //references
        const storageRef = storage.ref(file.name)
        const collectionRef = db.collection('images');

        // set progress, error and imageURL inside upload progress
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage)
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt})
            setImageURL(url);
        })
    }, [file])

    return { progress, imageURL, error }
}

export default useStorage;