import React from 'react';
import Home from './components/Home.jsx';
import Login from './Login/Login.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css"
import Welcome from './components/Welcome.jsx';
import Register from './Login/Register.jsx';
import TaskPage from './innerComponents/TaskPage.jsx';
import CommunityPage from './innerComponents/CommunityPage.jsx';
import ChatPage from './innerComponents/ChatPage.jsx';
import CoursesPage from './innerComponents/CoursesPage.jsx';
import ProgressPage from './innerComponents/ProgressPage.jsx';
import ModuleDetailsPage from './innerComponents/ModuleDetailsPage.jsx';
import Minimizepdf from './innerComponents/Minimizepdf.jsx';
import Exam from './innerComponents/Exam.jsx';

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
          <Route path="/module/:moduleName" element={<ModuleDetailsPage />} />
          <Route path="/minimizepdf" element={<Minimizepdf/>} />
          <Route path="/exam" element={<Exam/>} />
        </Routes>
      </div>
    </Router>
  )
}
