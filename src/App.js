import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    </Router>
    )
}

export default App;
