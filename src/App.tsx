import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Home} from './pages/home-page/Home'
import {Login} from './pages/Login'
import { NavBar } from './component/NavBar';
import { CreatePost } from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path = "/" element = {<Home />}></Route>
          <Route path = "/login" element = {<Login />} />
          <Route path = "/createpost" element = {<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
