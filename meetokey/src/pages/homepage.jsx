import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // ✅ 로그인 없이도 페이지 접근 가능하도록 우회
  useEffect(() => {
    let token = localStorage.getItem("token");

    // 🔥 로컬 테스트용 더미 토큰 추가 (실제 백엔드 호출 방지)
    if (!token) {
      token = "dummy_token";
      localStorage.setItem("token", token);
    }

    setUsername("Test User");
    setIsLoggedIn(true);
  }, []);

  const navigate = useNavigate();

  // ✅ 녹음 페이지 이동 시 인증 없이 이동 가능하게 변경
  const handleMicClick = () => {
    navigate('/recording');
  };

  // ✅ 회의록 데이터 (백엔드 없이도 표시되도록 Mock Data 사용)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetingsByDate(selectedDate);
  }, [selectedDate]);

  const fetchMeetingsByDate = async (date) => {
    console.log("Selected Date:", date);

    // 🔥 실제 API 호출 대신 더미 데이터 사용
    const mockMeetings = [
      { id: 1, title: "팀 회의", time: "10:00 AM" },
      { id: 2, title: "클라이언트 미팅", time: "3:00 PM" }
    ];

    setMeetings(mockMeetings);
  };

  return (
    <PageContainer>
      <div className="px-5 vh-100 d-flex flex-column">
        <Header>
          <LogoText>
            <h1 style={{ fontWeight: 'bold', fontSize: '55px' }}>📔 Meet Okey!</h1>
          </LogoText>
          <LoginContainer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '20px' }}>
              <p>Welcome! {username}</p>
            </div>
          </LoginContainer>
        </Header>

        <MainContainer>
          <MicButton onClick={handleMicClick}>🎙️</MicButton>
        </MainContainer>

        <MeetingSection>
          <NoteContainer>
            <div className="col-12 p-3">
              <div className="note-title">{selectedDate} Meeting Notes</div>
              <ul className="list-group">
                {meetings.length > 0 ? (
                  meetings.map((meeting, index) => (
                    <li key={index} className="list-group-item">{`${meeting.title} - ${meeting.time}`}</li>
                  ))
                ) : (
                  <li className="list-group-item">No meetings found for this date</li>
                )}
              </ul>
            </div>
          </NoteContainer>

          <CalenderContainer>
            <div className="col-4 p-3" style={{ textAlign: "center", width: "100%", marginLeft: "10px" }}>
              <h3 style={{ marginBottom: "16px", textAlign: "left", fontWeight: "bold" }}>Calender</h3>
              <StyledCalendar
                onChange={(date) => setSelectedDate(date.toISOString().split("T")[0])}
                value={new Date(selectedDate)}
                className="custom-calendar"
              />
            </div>
          </CalenderContainer>
        </MeetingSection>
      </div>
    </PageContainer>
  );
}

export default Homepage;

// ✅ 스타일 코드
const PageContainer = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom left, #ffffff, #CBC9EF);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  color:#3A215B;
  justify-content: center;
  position: relative;
`;

const LogoText = styled.div`
  font-size: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LoginContainer = styled.div`
  position: absolute;
  right: 20px;
  font-size: 14px;
`;

const MainContainer = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MicButton = styled.button`
  padding: 30px;
  background-color: #ffffff;
  border: none;
  border-radius: 300px;
  cursor: pointer;
  font-size: 90px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #C9C7EC !important;
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

const MeetingSection = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
`;

const NoteContainer = styled.div`
  width: 2000px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: black;
  border-radius: 26px;
  margin-right: 40px;
  box-shadow: 0px 4px 10px lightgray;
  position: relative;
  .note-title {
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 10;
  }
  .list-group {
    width: 100%;
    margin-top: 40px;
  }
  .list-group-item {
    background: #ffffff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border: none;
    width: 100%;
  }
`;

const CalenderContainer = styled.div`
  height: 100%;
  width: 500px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: center;
  border-radius: 26px;
  box-shadow: 0px 4px 10px lightgray;
`;

const StyledCalendar = styled(Calendar)`
  width: 100% !important;
  height: 400px !important;
  border-radius: 26px;
  border: 1px solid #ffffff;
  .react-calendar__tile {
    font-size: 18px !important;
    border-radius: 12px;
    transition: background-color 0.3s;
  }
  .react-calendar__tile:hover {
    background-color: #D8D8F2;
  }
  .react-calendar__tile--now {
    background: #C9C7EC !important;
    border-radius: 12px;
  }
  .react-calendar__tile--active {
    background: #CFADFF !important;
    color: white !important;
    border-radius: 12px;
  }
`;
