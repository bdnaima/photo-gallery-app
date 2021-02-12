import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Albums from './components/layout/Albums';
import AlbumImages from './components/layout/AlbumImages';
import Customer from './components/layout/Customer';
import { AuthProvider } from './contexts/AuthContext';


const App = () => {
  
  return (
    <BrowserRouter>
        <AuthProvider>
        <SimpleReactLightbox>
          <Route exact path='/'>
            <Redirect to="/signin" />
          </Route>

          <Route path='/signin'>
            <Signin />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route exact path='/albums'>
            <Albums />
          </Route>

          <Route path='/albums/:albumId'>
            <AlbumImages />
          </Route>

          <Route path='/customer/:albumId'>
            <Customer />
          </Route>
          </SimpleReactLightbox>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
