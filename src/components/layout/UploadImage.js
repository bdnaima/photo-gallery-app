import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { ProgressBar } from 'react-bootstrap';

const UploadImage = ({ imageFiles, setImageFiles, albumId, setMessage}) => {
    const { progress, isSuccess, isLoading } = useStorage(imageFiles, albumId);
    
    useEffect(() => {
        if (isLoading) {
            setImageFiles(null);
        }  

        if(isSuccess) {
            setMessage("Pictures uploaded successfully!")
        }

    }, [setImageFiles, setMessage, isSuccess, isLoading])

    return isLoading ? (
        <>
            <div> 
                <ProgressBar now={progress} label={`${progress}%`}/>
            </div>
        </>
    ) : null
}

export default UploadImage;