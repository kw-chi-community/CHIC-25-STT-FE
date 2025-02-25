import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Download, Search, Calendar, Clock, ChevronDown, Tag, MessageSquare, User, Info, RefreshCcw } from 'lucide-react';
import '../styles/MeetingDashboard.css';

const MeetingDashboard = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const meetingData = {
    date: '2025-02-10',
    time: '14:00-15:30',
    title: '2025년 1분기 제품 전략 회의',
    keyTopics: ['제품 로드맵', '시장 분석', '마케팅 전략', '경쟁사 동향', 'Q1 목표'],
    conversations: [
      {
        id: 1,
        speaker: '김부장',
        time: '00:10',
        content: '오늘 회의에서는 1분기 제품 전략에 대해 논의하도록 하겠습니다.',
        color: 'purple'
      },
      {
        id: 2,
        speaker: '이과장',
        time: '00:15',
        content: '현재 시장 점유율 분석 자료를 공유드리겠습니다. 주요 경쟁사 대비 우리 제품의 강점은...',
        color: 'blue'
      },
      {
        id: 3,
        speaker: '박대리',
        time: '00:22',
        content: '신제품 출시 일정과 관련하여 개발팀 진행 상황을 설명드리겠습니다.',
        color: 'green'
      }
    ],
    summaryTopics: [
      {
        title: '주요 논의사항',
        items: [
          '시장 점유율 분석 및 경쟁사 동향',
          '신제품 출시 일정 계획',
          '마케팅 전략 수립'
        ]
      },
      {
        title: '다음 할 일',
        items: [
          '개발팀 일정 조율',
          '마케팅 예산 검토',
          '고객 피드백 분석',
          '성과 지표 설정'
        ]
      }
    ]
  };

  // JWT 토큰 확인 후 로그인 안 되어 있으면 홈으로 이동
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("토큰 확인 중:", token);

    /*if (!token) {
      console.log("토큰 없음! 홈으로 이동");
      navigate("/");
    }*/
  }, [navigate]);

  return (
    <div className="meeting-dashboard">
      <div className='header' >
      <h1 className= "logotext" style={{ fontWeight: 'bold', fontSize: '55px' }}>
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
            {meetingData.keyTopics.map((topic, index) => (
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
              {meetingData.conversations.map((conv) => (
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
            {meetingData.summaryTopics.map((section, index) => (
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
