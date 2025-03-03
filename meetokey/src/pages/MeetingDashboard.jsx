import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동을 위한 훅 추가
import { Play, Pause, Download, FileText, Tag, BookOpen, CheckCircle } from 'lucide-react';
import '../styles/MeetingDashboard.css'; // ✅ CSS 연결

const MeetingDashboard = () => {
  const navigate = useNavigate(); // ✅ 네비게이션 함수

  const [activeTab, setActiveTab] = useState('summary');

  const meetingData = {
    title: '프로젝트 킥오프 미팅',
    date: '2025년 03월 03일',
    time: '14:00 ~ 15:30',
    categories: ['전략', '기획', '개발', '디자인', '마케팅'],
    topics: ['프로젝트 일정', '역할 분담', '예산 계획', '리스크 관리', '커뮤니케이션 계획'],
    transcript: `안녕하세요, 오늘은 신규 프로젝트에 대한 킥오프 미팅을 진행하겠습니다...`,
    summary: [
      {
        title: '주요 논의 사항',
        icon: <BookOpen size={20} className="icon" />,
        items: [
          '프로젝트 완료 기한은 6월 30일로 확정',
          '1차 프로토타입은 4월 15일까지 완료',
          '기술 스택: React(프론트엔드), Node.js(백엔드)',
          '주간 진행 상황 보고 미팅: 매주 월요일 10시',
          '총 예산 5000만원 (개발 60%, 디자인 25%, 마케팅 15%)'
        ]
      },
      {
        title: '다음 할 일',
        icon: <CheckCircle size={20} className="icon" />,
        items: [
          '개발팀: 시스템 아키텍처 설계 문서 작성 (3/10까지)',
          '디자인팀: 초기 UI 컨셉 제안 (3/15까지)',
          '마케팅팀: 경쟁사 분석 및 포지셔닝 전략 수립 (3/17까지)',
          '전체: 각 팀별 세부 일정 수립 (3/7까지)',
          '프로젝트 매니저: 협업 도구 및 커뮤니케이션 채널 설정 (3/5까지)'
        ]
      }
    ],
    keywords: ['프로젝트 킥오프', '일정 계획', '역할 분담', '예산 배분', '리스크 관리']
  };

  return (
    <div className="meeting-dashboard">
      <div className="header">
        <h1 className="logo">📔 Meet Okey!</h1>

        {/* ✅ 전체 회의록 보기 버튼 */}
        <button className="all-meetings-btn" onClick={() => navigate('/meetings')}>
          📄 전체 회의록 보기
        </button>

        <div className="meeting-info">
          <h2>{meetingData.title}</h2>
          <p>📅 {meetingData.date} | ⏰ {meetingData.time}</p>
          <div className="categories">
            {meetingData.categories.map((category, index) => (
              <span key={index} className="category">{category}</span>
            ))}
          </div>
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
            {meetingData.summary.map((section, idx) => (
              <div key={idx} className="summary-section">
                <h3>{section.icon} {section.title}</h3>
                <ul>
                  {section.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="transcript">
            <h3><FileText size={20} className="icon" /> 회의 내용</h3>
            <p>{meetingData.transcript}</p>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="keywords">
            <h3><Tag size={20} className="icon" /> 키워드</h3>
            <div className="keyword-list">
              {meetingData.keywords.map((keyword, idx) => (
                <span key={idx} className="keyword">{keyword}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDashboard;
