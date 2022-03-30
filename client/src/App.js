import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//Containers
import Home from './containers/Home';
import Login from './containers/Login';
import MyMusic from './containers/MyMusic';
//Style
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact={true} element={loggedIn ? (<Home />) : (<Navigate to="/login"/>)}>
          </Route>
          <Route path="/login" exact={true} element={!loggedIn ? (<Login />) : (<Navigate to="/"/>)}>
          </Route>
          <Route path="/myMusic" exact={true} element={loggedIn ? (<MyMusic />) : (<Navigate to="/login"/>)}>
          </Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
