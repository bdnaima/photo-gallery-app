import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Signin from './components/authentication/Signin';
import Albums from './components/layout/Albums';
import AlbumImages from './components/layout/AlbumImages';
import { AuthProvider } from './contexts/AuthContext';


const App = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        
          {/* <Signup /> */}

              <Route exact path='/'>
                <Redirect to="/signin" />
              </Route>

              <Route path='/signin'>
                <Signin />
              </Route>

              <Route exact path='/albums'>
                <Albums />
              </Route>

              <Route path='/albums/:albumId'>
                <AlbumImages />
              </Route>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
