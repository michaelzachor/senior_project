import React, { useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//Containers
import Home from './containers/Home';
import Login from './containers/Login';
import MyMusic from './containers/MyMusic';
import Signup from './containers/Signup';
import AddMusic from './components/AddMusic/AddMusic';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const {user} = useContext(AuthContext)
  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact={true} element={user ? (<Home />) : (<Navigate to="/login"/>)}>
          </Route>
          <Route path="/myMusic" exact={true} element={user ? (<MyMusic />) : (<Navigate to="/login"/>)}>
          </Route>
          <Route path="/login" exact={true} element={!user ? (<Login />) : (<Navigate to="/"/>)}>
          </Route>
          <Route path="/signup" exact={true} element={!user ? (<Signup />) : (<Navigate to="/"/>)}>
          </Route>
          <Route path="/loading" exact={true} element={<AddMusic />}>
          </Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
