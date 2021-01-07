
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/authentication/Signin';
import Navigation from './components/layout/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Signin />
    </div>
  );
}

export default App;
