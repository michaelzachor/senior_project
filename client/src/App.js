import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Containers
import Home from './containers/Home';
import Login from './containers/Login';
import MyMusic from './containers/MyMusic';
//Style
import './App.css';

function App() {
  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact={true} element={<Home />}>
          </Route>
          <Route path="/login" exact={true} element={<Login />}>
          </Route>
          <Route path="/myMusic" exact={true} element={<MyMusic />}>
          </Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
