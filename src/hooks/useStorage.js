import { useState, useEffect, useRef } from 'react';
import { storage, db, timestamp, } from '../firebase/firebaseIndex';

const useStorage = (files, albumId) => {
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const completed = useRef()

    useEffect(() => {

        if (!files) return;

        setIsSuccess(false);
        completed.current = 0

        // set progress, error and imageURL inside upload progress
        files.forEach(file => {
            const storageRef = storage.ref(Date.now() + '_' + file.name)
            const collectionRef = db.collection('images');
            storageRef.put(file).on('state_changed', snap => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage)
            }, (err) => {
                completed.current += 1
                isLoading(false)
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const albumRef = db.collection('albums').doc(albumId);
                const createdAt = timestamp();
                collectionRef.add({url, createdAt, albumRef});
                completed.current += 1
                if(files.length === completed.current) {
                    setIsSuccess(true);
                    setIsLoading(false)
                }
            })
        })

        setIsLoading(true)

    }, [files, albumId])

    return { progress, isSuccess, isLoading, error }
}

export default useStorage;