import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/GlobalStyle';

import Landing from './pages/Landing';
import Home from './pages/homepage';
import RecordingPage from './pages/RecordingPage';
import MeetingDashboard from './pages/MeetingDashboard';
import MeetingList from './pages/MeetingList';
import DateBasedNotes from './pages/DateBasedNotes';
import TopicBasedNotes from './pages/TopicBasedNotes';
import MeetingKeywordPage from "./pages/MeetingKeywordPage";


function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recording" element={<RecordingPage />} />
          <Route path="/dashboard" element={<MeetingDashboard />} />
          <Route path="/meetings" element={<MeetingList />} />
          <Route path="/date" element={<DateBasedNotes />} />
          <Route path="/topic" element={<TopicBasedNotes />} />
          <Route path="/keyword" element={<MeetingKeywordPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
