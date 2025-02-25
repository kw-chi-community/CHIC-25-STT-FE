import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Download, Search, Calendar, Clock, Tag, User, Info, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import '../styles/MeetingDashboard.css';

// 시간을 00:00 형식으로 포맷팅하는 함수
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const MeetingDashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [meetingData, setMeetingData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // currentTime 상태 추가
  const navigate = useNavigate();

  // 프로그레스 바의 너비 계산
  const progressWidth = meetingData && meetingData.audioDuration > 0
    ? (currentTime / meetingData.audioDuration) * 100
    : 0;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://112.152.14.116:25114/api/meetings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMeetings(response.data);

        if (response.data.length > 0) {
          setMeetingData(response.data[0]); // 첫 번째 회의 자동 설정
        }
      } catch (error) {
        console.error("회의 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    if (isPlaying && meetingData?.audioDuration) {
      const interval = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime < meetingData.audioDuration) {
            return prevTime + 1;
          }
          clearInterval(interval);
          return prevTime;
        });
      }, 1000); // 1초마다 업데이트

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }
  }, [isPlaying, meetingData?.audioDuration]);

  return (
    <div className="meeting-dashboard">
      <div className="header">
        <h1 className="logotext" style={{ fontWeight: 'bold', fontSize: '55px' }}>
          📔 Meet Okey!
        </h1>

        {meetingData ? (
          <div className="container">
            <div className="header-content">
              <h1 className="title">{meetingData.title || '회의 제목 없음'}</h1>
              <div className="date-time">
                <span className="date"><Calendar className="icon" /> {meetingData.date || '날짜 미제공'}</span>
                <span className="time"><Clock className="icon" /> {meetingData.time || '시간 미제공'}</span>
              </div>
            </div>

            <div className="tags">
              {meetingData.keyTopics?.length > 0 ? (
                meetingData.keyTopics.map((topic, index) => (
                  <span key={index} className="tag">
                    <Tag className="tag-icon" /> {topic}
                  </span>
                ))
              ) : (
                <span>📌 주요 토픽이 없습니다.</span>
              )}
            </div>
          </div>
        ) : (
          <p className="empty-state">📌 현재 등록된 회의가 없습니다.</p>
        )}
      </div>

      {meetingData && (
        <>
          <div className="audio-player2">
            <div className="container">
              <div className="audio-controls">
                <button onClick={() => setIsPlaying(!isPlaying)} className="play-button">
                  {isPlaying ? <Pause className="icon-small" /> : <Play className="icon-small" />}
                </button>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progressWidth}%` }}></div>
                </div>
                <div className="time-info">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(meetingData.audioDuration)}</span>
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
                  {meetingData.conversations?.length > 0 ? (
                    meetingData.conversations.map((conv) => (
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
                    ))
                  ) : (
                    <p className="empty-state">💬 현재 대화 내용이 없습니다.</p>
                  )}
                </div>
              </div>

              <div className="summary-dashboard">
                {meetingData.summaryTopics?.length > 0 ? (
                  meetingData.summaryTopics.map((section, index) => (
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
                            <span className="bullet"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">📌 요약된 내용이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingDashboard;
