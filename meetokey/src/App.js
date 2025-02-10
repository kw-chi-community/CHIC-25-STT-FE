import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/homepage'; // 기존 홈 페이지
import RecordingPage from './pages/RecordingPage'; 
import DocumentPage from "./pages/DocumentPage";
import MeetingDashboard from "./pages/MeetingDashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recording" element={<RecordingPage />} /> 
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/dashboard" element={<MeetingDashboard />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
