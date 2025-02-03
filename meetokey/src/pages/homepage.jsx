import React, { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import mic from '../assets/imgs/mic-remove.png';

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetingLogs, setMeetingLogs] = useState([
    { date: '2024-01-30', content: '회의록 1' },
    { date: '2024-01-29', content: '회의록 2' },
  ]);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('UserName'); // 실제 구현에서는 입력된 사용자 이름 사용
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredLogs = meetingLogs.filter(log => log.date === selectedDate);

  return (
    <PageContainer>
    <div className="px-5 vh-100 d-flex flex-column">
      <Header>
        <LogoText>
        <h1 style={{ fontWeight: 'bold',fontSize: '50px' }}>
            <i className="bi bi-journal-bookmark-fill"></i> Meet Okey !
        </h1>
        </LogoText>
        <LoginContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '20px' }}>
          {isLoggedIn ? (
            <>
              <p>Welcome! {username}</p>
              <Button style={{ backgroundColor: '#D8BFD8', borderColor: '#D8BFD8' }} onClick={handleLogout}>
          LogOut
        </Button>
            </>
          ) : (
            <Button style={{ backgroundColor: '#8A2BE2', borderColor: '#8A2BE2', color: '#fff' }} onClick={handleLoginShow}>
        LogIn
      </Button>
          )}
        </div>
        </LoginContainer>
      </Header>

      <MainContainer>
        <MicButton variant="primary" className="d-flex align-items-center">
          <img src={mic} alt="Microphone" style={{ width: '1000px', height: '200px', marginRight: '8px' }} />
        </MicButton>
      </MainContainer>

      <MeetingSection>
        <NoteContainer>
        <div className="col-6 p-3">
          <h4>최근 회의록</h4>
          <ul className="list-group">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <li key={index} className="list-group-item">{log.content}</li>
              ))
            ) : (
              <li className="list-group-item">해당 날짜의 회의록이 없습니다.</li>
            )}
          </ul>
        </div>
        </NoteContainer>
        
        <div className="col-4 p-3">
          <h4>Calender</h4>
          <StyledCalendar
            value={new Date(selectedDate)}
            onChange={setSelectedDate}
            className="custom-calendar"
          />
        </div>
        
        
      </MeetingSection>

      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>LogIn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control mb-2" placeholder="ID" />
          <input type="password" className="form-control mb-2" placeholder="Password" />
        </Modal.Body>
        <Modal.Footer>
        <Button style={{ backgroundColor: '#8A2BE2', borderColor: '#8A2BE2', color: '#fff' }} onClick={handleLoginClose}>
      Close
    </Button>
    <Button style={{ backgroundColor: '#8A2BE2', borderColor: '#8A2BE2', color: '#fff' }} onClick={handleLogin}>
      LogIn
    </Button>
    <Button style={{ backgroundColor: '#BA55D3', borderColor: '#BA55D3', color: '#fff' }} onClick={handleRegisterShow}>
      SignUp
    </Button>
     </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control mb-2" placeholder="Name" />
          <input type="text" className="form-control mb-2" placeholder="ID" />
          <input type="password" className="form-control mb-2" placeholder="Password" />
        </Modal.Body>
        <Modal.Footer>
        <Button style={{ backgroundColor: '#8A2BE2', borderColor: '#8A2BE2', color: '#fff' }} onClick={handleRegisterClose}>
      Close
    </Button>
    <Button
      style={{ backgroundColor: '#BA55D3', borderColor: '#BA55D3', color: '#fff' }}
      onClick={() => { setShowRegister(false); setShowLogin(true); }}
    >
      SignUp
    </Button>
      </Modal.Footer>
      </Modal>
    </div>
    </PageContainer>
  );
}

export default Homepage;

const PageContainer = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom left, #ffffff, #CBC9EF);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;  /* 헤더 내 요소 중앙 정렬 */
  position: relative; /* 절대 위치 요소를 위한 설정 */
`;

const LogoText = styled.div`
  font-size: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LoginContainer = styled.div`
display: flex;
align-items: center;
gap: 5px;
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
  height: 100%;
  padding: 12px 24px;
  align-items: center;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 26px;
  margin-right: 40px;
  box-shadow: none;
  display: flex;
  justify-content: center;
`;

const MeetingSection = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

const NoteContainer = styled.div`
  height: 100%;
  flex: 6;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 26px;
  margin-right: 40px;
  box-shadow: 0px 4px 10px lightgray;
`;

const CalenderContainer = styled.div`
  height: 100%;
  width: 500px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 26px;
  flex-grow: 1;
  box-shadow: 0px 4px 10px lightgray;
`;

const StyledCalendar = styled(Calendar)`
  width: 100% !important;
  height: 400px !important;
  border-radius: 26px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  .react-calendar__tile {
    font-size: 18px !important;
    border-radius: 12px;
    transition: background-color 0.3s;
  }

  .react-calendar__tile:hover {
    background-color: #D8D8F2;
  }

  .react-calendar__tile--now {
    background: #C9C7EC !important; /* 오늘 날짜는 하늘색으로! */
    border-radius: 12px;
  }

  .react-calendar__tile--active {
    background: #CFADFF !important; /* 선택된 날짜는 더 진한 파란색으로! */
    color: white !important;
    border-radius: 12px;
  }

  /* 회의록이 있는 날짜 스타일 */
  .meeting-log-day {
    background-color: #ffefc2 !important; /* 노란색 배경 */
    color: #8b572a !important;
    font-weight: bold;
  }
`;
