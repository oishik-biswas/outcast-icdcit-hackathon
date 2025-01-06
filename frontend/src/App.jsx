import React from 'react';
import Home from './components/Home';
import Login from './Login/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css"
import Welcome from './components/Welcome';
import Register from './Login/Register';
import TaskPage from './innerComponents/TaskPage';
import CommunityPage from './innerComponents/CommunityPage';
import ChatPage from './innerComponents/ChatPage';
import CoursesPage from './innerComponents/CoursesPage';
import ProgressPage from './innerComponents/ProgressPage';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/taskpage" element={<TaskPage/>}/>
          <Route path="/communitypage" element={<CommunityPage/>}/>
          <Route path="/chatpage" element={<ChatPage/>}/>
          <Route path="/coursespage" element={<CoursesPage/>}/>
          <Route path="/progresspage" element={<ProgressPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}
