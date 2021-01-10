import React, { useState} from 'react';
import { db } from "../../firebase/firebaseIndex";
import { Button } from 'react-bootstrap;'



const NewAlbum = () => {
    const [newAlbum, setNewAlbum] = useState("");

    return (
        <Button onClick={() => {
            if(!newAlbum) {
                return
            }
            db.collection('albums').doc(newAlbum).set({
                title: newAlbum
            })}
        }>Create</Button>
    )
}