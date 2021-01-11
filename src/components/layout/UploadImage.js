import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { ProgressBar } from 'react-bootstrap';

const UploadImage = ({ imageFile, setImageFile, albumId }) => {
    const { imageURL, progress } = useStorage(imageFile, albumId);
    
    useEffect(() => {
        if (imageURL){
            setImageFile(null);
        }
    }, [imageURL, setImageFile])

    return (
        <div> 
            <ProgressBar now={progress} label={`${progress}%`}/>
        </div>
        
    )
}

export default UploadImage;