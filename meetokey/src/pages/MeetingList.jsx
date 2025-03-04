import React, { useState, useEffect } from "react";
import MeetingCard from "../components/MeetingCard";
import "../styles/MeetingStyles.css";

const API_BASE_URL = "http://112.152.14.116:25114";  // ✅ 백엔드 API 주소

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date"); // 기본값: 최신순

  // ✅ 백엔드에서 회의 목록 가져오기
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
          throw new Error("회의 데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("❌ 회의 목록 불러오기 실패:", error);
      }
    };

    fetchMeetings();
  }, []);

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.meeting_name.includes(searchTerm) ||
      meeting.topics?.some((topic) => topic.includes(searchTerm));

    const matchesCategory =
      categoryFilter === "all" || meeting.categories?.includes(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.meeting_date) - new Date(a.meeting_date); // 최신순
    }
    if (sortBy === "title") {
      return a.meeting_name.localeCompare(b.meeting_name); // 제목순 (가나다 정렬)
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
