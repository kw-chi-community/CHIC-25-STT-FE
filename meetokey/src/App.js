import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/homepage'; // 기존 홈 페이지
import RecordingPage from './pages/RecordingPage'; // 👈 RecordingPage 올바르게 불러오기

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recording" element={<RecordingPage />} /> {/* 👈 라우트 등록 확인 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
