import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import Signin from './components/authentication/Signin';
import Albums from './components/layout/Albums';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        
          {/* <Signup /> */}

              <Route path='/'>
                <Redirect to="/signin" />
              </Route>

              <Route path='/signin'>
                <Signin />
              </Route>

              <Route path='/albums'>
                
                <Albums />
              </Route>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
