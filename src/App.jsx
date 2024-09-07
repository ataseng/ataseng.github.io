import Home from './pages/Home/Home'
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  
  return (
    <Router>
        <Sidebar />
        <Home/>
    </Router>
  );
}

export default App;
