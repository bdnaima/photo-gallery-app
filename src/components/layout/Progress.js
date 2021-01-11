import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { ProgressBar } from 'react-bootstrap';

const Progress = ({ imageFile, setImageFile }) => {
    const { imageURL, progress } = useStorage(imageFile);
    
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

export default Progress;