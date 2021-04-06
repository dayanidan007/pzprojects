import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Components/Home'


function App() {
  return (
    <Router>
        <Route path='/' exact render={() => <Home />} />
    </Router>
  );
}

export default App;
