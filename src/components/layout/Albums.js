import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebaseIndex';
import { AuthContext } from '../../contexts/AuthContext';

const Albums = () => {
    const user = useContext(AuthContext)
    const history = useHistory();

    const handleClick = () => {

        auth.signOut().then(() => {
            history.push('/signin')
        })
    }

    if (user === null) {
        console.log("Signing in...")
        return <div>Signing in...</div>;
    }

    return (
        <div>
            <h1>Albums</h1>
            <h2>{user.uid} Signed in!</h2>
            <button onClick={handleClick}>Sign out</button>
        </div>
    )
}

export default Albums;