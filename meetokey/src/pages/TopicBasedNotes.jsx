import React from "react";
import styled from "styled-components";

const topicData = [
  { topic: "디자인", notes: ["UI 리뷰", "컬러 가이드 설정"] },
  { topic: "개발", notes: ["API 연결", "에러 수정"] },
  { topic: "마케팅", notes: ["SNS 캠페인", "배너 디자인"] },
];

const TopicBasedNotes = () => {
  return (
    <PageContainer>
      <Sidebar>
        <Logo>MEET OKEY</Logo>
        <NavItem onClick={() => window.history.back()}>📅 날짜별 회의록</NavItem>
        <NavItem active>📚 주제별 회의록</NavItem>
        <Logout>🚪 뒤로 가기</Logout>
      </Sidebar>

      <MainContent>
        <MeetingListSection>
          <MeetingTitle>📚 주제별 회의록</MeetingTitle>
          {topicData.map((topic, index) => (
            <div key={index}>
              <Topic>{topic.topic}</Topic>
              {topic.notes.map((note, i) => (
                <MeetingItem key={i}>{note}</MeetingItem>
              ))}
            </div>
          ))}
        </MeetingListSection>
      </MainContent>
    </PageContainer>
  );
};

export default TopicBasedNotes;

// 🎨 기존 스타일 그대로 복붙
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
  color: #6a26cd;
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

const Topic = styled.h5`
  font-size: 18px;
  color: #6a26cd;
  margin: 20px 0 10px;
`;

const MeetingItem = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #f4eaff;
  color: #6a26cd;
  text-align: center;
`;
