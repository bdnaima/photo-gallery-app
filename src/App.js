
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signin from './components/authentication/Signin';
// import Navigation from './components/layout/Navigation';

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        {/* <Navigation />
        <Signup /> */}
        <div className="w-100" style={{ maxWidth: "400px" }}>

          <Routes>
            <Route path='/signin'>
              <Signin />
            </Route>
          </Routes>

        </div>
      </Container>
  );
}

export default App;
