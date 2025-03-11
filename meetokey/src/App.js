import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';


import Landing from './pages/Landing'; 
import Home from './pages/homepage'; 
import RecordingPage from './pages/RecordingPage'; 
import MeetingDashboard from "./pages/MeetingDashboard";
import MeetingList from "./pages/MeetingList";  

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} /> {/* ✅ 랜딩 페이지를 기본 페이지로 설정 */}
          <Route path="/home" element={<Home />} /> {/* 기존 홈은 /home으로 이동 */}
          <Route path="/recording" element={<RecordingPage />} /> 
          <Route path="/dashboard" element={<MeetingDashboard />} />
          <Route path="/meetings" element={<MeetingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
