import React from 'react';
import Home from './components/Home';
import Login from './Login/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css"
import Welcome from './components/Welcome';
import Register from './Login/Register';
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  )
}
