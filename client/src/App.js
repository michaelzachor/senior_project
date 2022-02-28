import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Containers
import Home from './containers/Home';
import Login from './containers/Login';
//Style
import './App.css';

function App() {
  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
