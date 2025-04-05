import React, { useState } from "react";
import Header from "../components/landingComponents/Header";
import Sidebar from "../components/Keyword/Sidebar";
import MeetingKeywordGraph from "../components/Keyword/MeetingKeywordGraph";
import "../styles/MeetingKeywordPage.css";

const MeetingKeywordPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [activeTab, setActiveTab] = useState("논의사항"); // 🔥 탭 상태 추가

  const [meetingInfo] = useState({
    title: "광운대학교 회의",
    date: "2025.03.01~2025.03.15",
    topKeyword: "운영진",
    topCategory: "학생회",
  });

  const [keywords] = useState([
    { word: "운영진", category: "학생회", color: "#000" },
    { word: "회의록", color: "#80d8ff" },
    { word: "예산", color: "#aed581" },
    { word: "기획안", color: "#ffcc80" },
    { word: "참여", color: "#f48fb1" },
    { word: "피드백", color: "#ce93d8" },
    { word: "일정", color: "#4fc3f7" },
    { word: "투표", color: "#ffd54f" },
    { word: "협의", color: "#81c784" },
    { word: "공유", color: "#e0e0e0" },
    { word: "행사", color: "#ffab91" },
    { word: "담당자", color: "#a1887f" },
  ]);

  const filteredKeywords =
    selectedCategory === "전체"
      ? keywords
      : keywords.filter((k) => k.category === selectedCategory);

  // 🔥 탭 클릭 시 내용 변경되는 컴포넌트
  const renderTabContent = () => {
    switch (activeTab) {
      case "논의사항":
        return <p>예산 분배 문제, 행사 기획안 승인, 회의록 관리 방안에 대해 논의했습니다.</p>;
      case "할일":
        return (
          <ul>
            <li>예산안 수정 후 재검토</li>
            <li>기획안 제출 마감일 공지</li>
            <li>회의록 공유 후 피드백 수렴</li>
          </ul>
        );
      case "요약":
        return <p>전체 회의 중 35분 경부터 행사 관련 논의가 집중적으로 이뤄졌으며, 48분부터 마무리 발언이 있었습니다.</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="keyword-page">
        <div className="keyword-header">
          <div className="category-info">
            <div className="category-title">학생회 {'>'} 회의</div>
            <div className="category-date">{meetingInfo.date}</div>
          </div>
          <div className="highlight-info">
            <div className="top-category">{meetingInfo.topCategory}</div>
            <div className="top-keyword">주요 키워드 TOP 5: {meetingInfo.topKeyword}</div>
          </div>
        </div>

        <div className="keyword-main">
          <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <MeetingKeywordGraph center={meetingInfo.topKeyword} keywords={filteredKeywords} />
        </div>

        <div className="text-section">
          <h3>📄 텍스트 내역</h3>
          <p>
            회의는 전체적으로 원활하게 진행되었으며, 예산 분배와 행사 기획안에 대한 다양한 의견이 오갔습니다. 
            중간에 몇 가지 일정 조율 문제가 있었지만 참여자 간의 피드백을 통해 조율되었고, 
            회의록 작성 방식에 대한 개선 요구도 있었습니다. 향후 운영진은 이러한 요청을 바탕으로 시스템 개선을 논의할 예정입니다.
          </p>
        </div>

        {/* 🔥 탭 UI */}
        <div className="tab-section">
          <div className="tab-buttons">
            <button
              className={activeTab === "논의사항" ? "active" : ""}
              onClick={() => setActiveTab("논의사항")}
            >
              📌 주요 논의사항
            </button>
            <button
              className={activeTab === "할일" ? "active" : ""}
              onClick={() => setActiveTab("할일")}
            >
              📝 다음 할 일
            </button>
            <button
              className={activeTab === "요약" ? "active" : ""}
              onClick={() => setActiveTab("요약")}
            >
              🔉 음성파일 요약
            </button>
          </div>

          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingKeywordPage;
