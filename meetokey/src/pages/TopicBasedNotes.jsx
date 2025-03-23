import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const topicData = [
  { topic: "디자인", notes: ["UI 리뷰", "컬러 가이드 설정"] },
  { topic: "개발", notes: ["API 연결", "에러 수정"] },
  { topic: "마케팅", notes: ["SNS 캠페인", "배너 디자인"] },
];

const TopicBasedNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("전체");

  const filteredTopics = topicData.filter((t) =>
    t.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  // 전체 선택 시 모든 회의록 보여주기
  const selectedNotes =
    selectedTopic === "전체"
      ? topicData.flatMap((t) => t.notes.map((note) => ({ topic: t.topic, note })))
      : topicData
          .find((t) => t.topic === selectedTopic)
          ?.notes.map((note) => ({ topic: selectedTopic, note })) || [];

  return (
    <PageContainer>
      <Sidebar>
        <Logo>MEET OKEY</Logo>
        <NavItem onClick={() => window.history.back()}>📅 날짜별 회의록</NavItem>
        <NavItem active>📚 주제별 회의록</NavItem>

        <SearchBox>
  <SearchIcon>🔍</SearchIcon>
  <SearchInput
    placeholder="주제를 검색하세요..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</SearchBox>


        <TopicList>
          <TopicButton
            onClick={() => setSelectedTopic("전체")}
            active={selectedTopic === "전체"}
          >
            전체
          </TopicButton>

          {filteredTopics.map((t, i) => (
            <TopicButton
              key={i}
              onClick={() => setSelectedTopic(t.topic)}
              active={selectedTopic === t.topic}
            >
              {t.topic}
            </TopicButton>
          ))}
        </TopicList>

        <Logout onClick={() => navigate("/recording")}>📝 회의하기</Logout>

      </Sidebar>

      <MainContent>
        <MeetingListSection>
          <MeetingTitle>
            📚 {selectedTopic} 회의록
          </MeetingTitle>

          {selectedNotes.length > 0 ? (
            selectedNotes.map((item, i) => (
              <MeetingItem key={i}>
                <strong>[{item.topic}]</strong> {item.note}
              </MeetingItem>
            ))
          ) : (
            <NoMeeting>😔 회의록이 없습니다.</NoMeeting>
          )}
        </MeetingListSection>
      </MainContent>
    </PageContainer>
  );
};

export default TopicBasedNotes;

// 💅 스타일 정의는 그대로 유지

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4eaff;
`;

const Sidebar = styled.div`
  width: 400px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h2`
  font-weight: 700;
  color:rgb(0, 0, 0);
  margin-bottom: 30px;
`;

const NavItem = styled.div`
  padding: 12px 16px;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#6a26cd" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6a26cd")};
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #8a45e5;
    color: white;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 20px 0;
`;

const SearchIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
  color: #6a26cd;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  flex: 1;
  color: #333;
`;

const TopicList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopicButton = styled.button`
  background: ${(props) => (props.active ? "#6a26cd" : "#f4f4f4")};
  color: ${(props) => (props.active ? "white" : "#6a26cd")};
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;

  &:hover {
    background: #8a45e5;
    color: white;
  }
`;

const Logout = styled.div`
  margin-top: auto;
  color: #6a26cd;
  cursor: pointer;
  text-align: left;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const MeetingListSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MeetingTitle = styled.h4`
  color: rgb(0, 0, 0);
  text-align: center;
  margin-bottom: 10px;
  font-weight: 200;
`;

const MeetingItem = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #f4eaff;
  color: #6a26cd;
  text-align: center;
`;

const NoMeeting = styled.div`
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 14px;
`;
