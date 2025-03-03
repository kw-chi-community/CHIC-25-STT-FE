import React, { useState } from "react";
import MeetingCard from "../components/MeetingCard";
import "../styles/MeetingStyles.css";

const meetings = [
  {
    id: 1,
    title: "프로젝트 킥오프 미팅",
    date: "2025-03-03",
    time: "14:00 ~ 15:30",
    categories: ["전략", "기획", "개발"],
    topics: ["프로젝트 일정", "역할 분담", "예산 계획"],
  },
  {
    id: 2,
    title: "주간 개발팀 스크럼",
    date: "2025-03-02",
    time: "10:00 ~ 10:30",
    categories: ["개발"],
    topics: ["진행 상황 공유", "이슈 논의"],
  },
  {
    id: 3,
    title: "UI/UX 디자인 리뷰",
    date: "2025-02-27",
    time: "13:30 ~ 15:00",
    categories: ["디자인", "리뷰"],
    topics: ["사용자 피드백", "UI 개선", "디자인 요소 검토"],
  },
  {
    id: 4,
    title: "마케팅 전략 회의",
    date: "2025-02-28",
    time: "15:00 ~ 16:30",
    categories: ["마케팅", "전략"],
    topics: ["분기별 마케팅 계획", "예산 배분", "성과 지표"],
  },
];

const MeetingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date"); // 기본값: 최신순

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = meeting.title.includes(searchTerm) || 
                          meeting.topics.some(topic => topic.includes(searchTerm));
    const matchesCategory =
      categoryFilter === "all" || meeting.categories.includes(categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date); // 최신순
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title); // 제목순 (가나다 정렬)
    }
    return 0;
  });

  return (
    <div className="meeting-list-container">
      <header className="meeting-list-header">
        <h1 className="logo">📔 Meet Okey!</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="회의 제목 또는 주제 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="meeting-list-filters">
        {/* 카테고리 필터 */}
        <div className="filter-section">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">전체 카테고리</option>
            <option value="전략">전략</option>
            <option value="기획">기획</option>
            <option value="개발">개발</option>
            <option value="디자인">디자인</option>
            <option value="마케팅">마케팅</option>
          </select>
        </div>

        {/* 정렬 기준 선택 */}
        <div className="sort-section">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">최신순</option>
            <option value="title">제목순</option>
          </select>
        </div>
      </div>

      <main>
        <div className="meetings-grid">
          {sortedMeetings.length > 0 ? (
            sortedMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          ) : (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MeetingList;
