
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signin from './components/authentication/Signin';
import Albums from './components/layout/Albums';

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        {/* <Navigation />
        <Signup /> */}
        <div className="w-100" style={{ maxWidth: "400px" }}>

          <Routes>
            <Route path='/'>
              <Redirect to="/signin" />
            </Route>

            <Route path='/signin'>
              <Signin />
            </Route>

            <Route path='/albums'>
              <Albums />
            </Route>

          </Routes>

        </div>
      </Container>
  );
}

export default App;
