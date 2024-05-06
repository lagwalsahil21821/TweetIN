import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import { NavBar } from './component/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path = "/" element = {<Home />}></Route>
          <Route path = "/login" element = {<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
