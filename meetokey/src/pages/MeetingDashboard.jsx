import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Download, Search, Calendar, Clock, Tag, User, Info, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import '../styles/MeetingDashboard.css';

const MeetingDashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [meetingData, setMeetingData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    /*if (!token) {
      console.log("토큰 없음! 홈으로 이동");
      navigate("/");
      return;
    }*/
    
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://112.152.14.116:25113/api/meetings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMeetings(response.data);
        if (response.data.length > 0) {
          setMeetingData(response.data[0]);
        }
      } catch (error) {
        console.error("회의 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchMeetings();
  }, [navigate]);

  if (!meetingData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="meeting-dashboard">
      <div className='header'>
        <h1 className="logotext" style={{ fontWeight: 'bold', fontSize: '55px' }}>
          📔 Meet Okey!
        </h1>
        <div className="container">
          <div className="header-content">
            <h1 className="title">{meetingData.title}</h1>
            <div className="date-time">
              <span className="date"><Calendar className="icon" /> {meetingData.date}</span>
              <span className="time"><Clock className="icon" /> {meetingData.time}</span>
            </div>
          </div>

          <div className="tags">
            {meetingData.keyTopics?.map((topic, index) => (
              <span key={index} className="tag">
                <Tag className="tag-icon" />
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="audio-player2">
        <div className="container">
          <div className="audio-controls">
            <button onClick={() => setIsPlaying(!isPlaying)} className="play-button">
              {isPlaying ? <Pause className="icon-small" /> : <Play className="icon-small" />}
            </button>
            <div className="progress-bar">
              <div className="progress" style={{ width: '33%' }}></div>
            </div>
            <div className="time-info">
              <span>00:00</span>
              <span>45:30</span>
            </div>
            <button className="download-button">
              <Download className="icon-small" /> 다운로드
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          <div className="conversations">
            <div className="search-bar">
              <Search className="search-icon" />
              <input type="text" placeholder="대화 내용 검색..." className="search-input" />
            </div>
            <div className="conversation-list">
              {meetingData.conversations?.map((conv) => (
                <div key={conv.id} className="conversation">
                  <div className="conversation-header">
                    <div className={`avatar ${conv.color}`}>
                      <User className={`avatar-icon ${conv.color}`} />
                    </div>
                    <span className="speaker">{conv.speaker}</span>
                    <span className="time">{conv.time}</span>
                  </div>
                  <p className="content">{conv.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-dashboard">
            {meetingData.summaryTopics?.map((section, index) => (
              <div key={index} className="summary-section">
                <div className="section-header">
                  <h3 className="section-title">
                    {section.title} <Info className="icon-small" />
                  </h3>
                  <RefreshCcw className="icon-small" />
                </div>
                <ul className="section-items">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="item">
                      <span className="bullet"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDashboard;
