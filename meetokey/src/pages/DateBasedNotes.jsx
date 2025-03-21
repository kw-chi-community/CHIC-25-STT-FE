import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    { date: "2024-03-21", title: "프로젝트 킥오프 회의" },
    { date: "2024-03-22", title: "UI 디자인 검토 회의" },
    { date: "2024-03-22", title: "개발 일정 조율" },
  ]);

  // 선택한 날짜의 회의 목록 필터링
  const filteredMeetings = meetings.filter(
    (meeting) => meeting.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <PageContainer>
      {/* 📌 사이드바 (주제별 회의록 아래에 달력 추가) */}
      <Sidebar>
        <Logo>MEET OKEY</Logo>
        <NavItem>📅 날짜별 회의록</NavItem>
        <NavItem active>📚 주제별 회의록</NavItem>
        
        {/* 📅 사이드바에 달력 추가 */}
        <SidebarCalendar>
          <CalendarTitle>📆 날짜 선택</CalendarTitle>
          <StyledCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            calendarType="gregory"
          />
        </SidebarCalendar>

        <Logout>🚪뒤로 가기 </Logout>
      </Sidebar>

      {/* 📜 오른쪽에 선택한 날짜의 회의 목록 */}
      <MainContent>
        <MeetingListSection>
          <MeetingTitle>📜 회의 목록 ({selectedDate.toDateString()})</MeetingTitle>
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting, index) => (
              <MeetingItem key={index}>{meeting.title}</MeetingItem>
            ))
          ) : (
            <NoMeeting>😔 해당 날짜의 회의가 없습니다.</NoMeeting>
          )}
        </MeetingListSection>
      </MainContent>
    </PageContainer>
  );
};

export default CalendarPage;

// 스타일 정의
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
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #8a45e5;
    color: white;
  }
`;

// 📅 사이드바 안에 들어가는 달력 스타일
const SidebarCalendar = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: #f9f5ff;
  border-radius: 12px;
`;

const CalendarTitle = styled.h4`
  color: #6a26cd;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  font-size: 14px;

  .react-calendar__navigation {
    background: none;
    color: #6a26cd;
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: #6a26cd !important;
    color: white !important;
    border-radius: 8px;
  }

  .react-calendar__tile:hover {
    background: #e6d8ff;
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
  color: #6a26cd;
  text-align: center;
  margin-bottom: 10px;
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
