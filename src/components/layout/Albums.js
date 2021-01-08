import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebaseIndex';

const Albums = () => {
    const history = useHistory();

    const handleClick = () => {

        auth.signOut().then(() => {
            history.push('/signin')
        })
    }

    return (
        <div>
            <h1>Signed in!</h1>
            <button onClick={handleClick}>Sign out</button>
        </div>
    )
}

export default Albums;