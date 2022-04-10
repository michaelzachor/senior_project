import React, { useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//Containers
import Home from './containers/Home';
import Login from './containers/Login';
import MyMusic from './containers/MyMusic';
import Signup from './containers/Signup';
import CountMusic from './components/Loading/CountMusic';
import NewMusic from './components/Loading/NewMusic';
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
          <Route path="/login" exact={true} element={!user ? (<Login />) : (<Navigate to="/loadingCheck"/>)}>
          </Route>
          <Route path="/signup" exact={true} element={!user ? (<Signup />) : (<Navigate to="/"/>)}>
          </Route>
          <Route path="/loadingCheck" exact={true} element={<CountMusic />}>
          </Route>
          <Route path="/loadingNew" exact={true} element={<NewMusic />}>
          </Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
