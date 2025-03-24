import React, { useState } from "react";
import Sidebar from "../components/Keyword/Sidebar";
import MeetingKeywordGraph from "../components/Keyword/MeetingKeywordGraph";
import "../styles/MeetingKeywordPage.css"; // src/styles 안에 위치해야 함

const MeetingKeywordPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
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

  return (
    <div className="keyword-page">
      <div className="keyword-header">
        <div className="category-info">
          <div className="category-title">학생회 {'>'} 회의</div>
          <div className="category-date">{meetingInfo.date}</div>
        </div>
        <div className="highlight-info">
          <div className="top-category">{meetingInfo.topCategory}</div>
          <div className="top-keyword">연관어 TOP 1: {meetingInfo.topKeyword}</div>
        </div>
      </div>

      <div className="keyword-main">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <MeetingKeywordGraph center={meetingInfo.topKeyword} keywords={keywords} />
      </div>
    </div>
  );
};

export default MeetingKeywordPage;
