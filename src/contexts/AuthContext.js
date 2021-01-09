import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseIndex';


export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if (user) {
              setUser(user)
              history.push("/albums");
              console.log ("User signed in:", user.uid )
            }
          });
    });

    return (
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
      );

}








