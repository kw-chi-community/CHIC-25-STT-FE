import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/homepage'; // 기존 홈 페이지
import RecordingPage from './pages/RecordingPage'; 
import DocumentPage from "./pages/DocumentPage";
import MeetingDashboard from "./pages/MeetingDashboard";
import MeetingList from "./pages/MeetingList";  // MeetingList를 pages 폴더로 옮김

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recording" element={<RecordingPage />} /> 
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/dashboard" element={<MeetingDashboard />} />
          <Route path="/meetings" element={<MeetingList />} /> {/* ✅ 회의 목록 페이지 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
