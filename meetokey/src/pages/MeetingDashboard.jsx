import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동을 위한 훅 추가
import { Play, Pause, Download, FileText, Tag, BookOpen, CheckCircle } from 'lucide-react';
import '../styles/MeetingDashboard.css'; // ✅ CSS 연결
const API_BASE_URL = "https://meetokey.charlie-3965.com/"; // ✅ 백엔드 API 주소

const MeetingDashboard = () => {
  const navigate = useNavigate(); // ✅ 네비게이션 함수
  const [activeTab, setActiveTab] = useState('summary');
  const [meetingData, setMeetingData] = useState(null);

  // ✅ 현재 날짜 가져오기 (API 요청 시 활용)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // ✅ 특정 날짜의 회의 데이터 가져오기
  useEffect(() => {
    fetch(`${API_BASE_URL}/by-date/${year}/${month}/${day}`)
      .then(response => {
        if (!response.ok) throw new Error("회의 데이터를 가져오지 못했습니다.");
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const meetingId = data[0].id;
          fetch(`${API_BASE_URL}/${meetingId}`)
            .then(res => res.json())
            .then(meeting => setMeetingData(meeting))
            .catch(err => console.error("회의 데이터 로딩 오류:", err));
        } else {
          console.warn("해당 날짜에 회의가 없습니다.");
        }
      })
      .catch(err => console.error("API 요청 오류:", err));
  }, [year, month, day]);

  if (!meetingData) {
    return <div className="meeting-dashboard">📌 회의 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="meeting-dashboard">
      <div className="header">
        <h1 className="logo">📔 Meet Okey!</h1>

        {/* ✅ 전체 회의록 보기 버튼 */}
        <button className="all-meetings-btn" onClick={() => navigate('/meetings')}>
          📄 전체 회의록 보기
        </button>

        <div className="meeting-info">
          <h2>{meetingData.meeting_name}</h2>
          <p>📅 {new Date(meetingData.meeting_date).toLocaleDateString()} | ⏰ {meetingData.meeting_time}</p>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div className="tabs">
        <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab('summary')}>📌 요약 및 할 일</button>
        <button className={activeTab === 'transcript' ? 'active' : ''} onClick={() => setActiveTab('transcript')}>📝 텍스트 내역</button>
        <button className={activeTab === 'keywords' ? 'active' : ''} onClick={() => setActiveTab('keywords')}>🔍 키워드</button>
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        {activeTab === 'summary' && (
          <div className="summary">
            <h3><BookOpen size={20} className="icon" /> 주요 논의 사항</h3>
            <ul>
              <li>프로젝트 일정: {meetingData.meeting_date}</li>
              <li>참석자: {meetingData.participants || '정보 없음'}</li>
              <li>중요 키워드: {meetingData.keywords?.map(k => k.keyword).join(', ') || '없음'}</li>
            </ul>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="transcript">
            <h3><FileText size={20} className="icon" /> 회의 내용</h3>
            <p>{meetingData.transcript || '텍스트 내역이 없습니다.'}</p>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="keywords">
            <h3><Tag size={20} className="icon" /> 키워드</h3>
            <div className="keyword-list">
              {meetingData.keywords?.map((keyword, idx) => (
                <span key={idx} className="keyword">{keyword.keyword}</span>
              )) || '키워드가 없습니다.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDashboard;
