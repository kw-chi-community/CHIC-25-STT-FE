import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";


const pastelColors = [
    "#ffe0ec", "#e0f7fa", "#fff3cd", "#e6f4ea",
    "#f3e5f5", "#e3f2fd", "#fdebd0", "#e0e0e0"
  ];
  
  const getColorForDate = (dateStr) => {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % pastelColors.length;
    return pastelColors[index];
  };
  

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [meetings] = useState([
    { date: "2025-03-1", title: "프로젝트 킥오프 회의" },
    { date: "2025-03-10", title: "UI 디자인 검토 회의" },
    { date: "2025-03-22", title: "개발 일정 조율" },
    { date: "2025-03-3", title: "사용자 피드백 정리" },
    { date: "2025-03-23", title: "마케팅 전략 회의" },
    { date: "2025-03-26", title: "배포 일정 논의" }
  ]);

  const recordedDates = [...new Set(meetings.map(meeting => meeting.date))];

  const filteredMeetings = meetings.filter(
    (meeting) => meeting.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <PageContainer>
      <Sidebar>
        <Logo>MEET OKEY</Logo>
        <NavItem active>📅 날짜별 회의록</NavItem>
        <NavItem onClick={() => navigate("/topic")}>📚 주제별 회의록</NavItem>

        <SidebarCalendar>
          <CalendarTitle>📆 Calendar 📆</CalendarTitle>
          <StyledCalendar
  onChange={setSelectedDate}
  value={selectedDate}
  calendarType="gregory"
  tileContent={({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const selectedStr = selectedDate.toISOString().split("T")[0];

      // 선택된 날짜는 표시 안함 (배경 겹침 방지)
      if (dateStr === selectedStr) return null;

      if (recordedDates.includes(dateStr)) {
        const bg = getColorForDate(dateStr);
        return (
          <div
            style={{
              backgroundColor: bg,
              borderRadius: "0px",
              height: "30%",
              width: "100%",
              boxSizing: "border-box",
              border: "2px solid transparent",
            }}
          />
        );
      }
    }
    return null;
  }}
/>

        </SidebarCalendar>

        <Logout>🚪 뒤로 가기</Logout>
      </Sidebar>

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
  font-weight: 00;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #8a45e5;
    color: white;
  }
`;

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

  /* ✅ highlight 클래스 스타일 */
  .highlight {
    background-color: #ffe0ec !important; /* 파스텔 핑크 */
    color: #6a26cd !important;
    border-radius: 8px;
    font-weight: bold;
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
  color:rgb(0, 0, 0);
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
