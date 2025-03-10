import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  // Login, logout functionality
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // JWT decoding
        setUsername(decoded.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // Login form fields
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("userid", loginUserID);
    formData.append("password", loginPassword);

    try {
      const response = await fetch("https://meetokey.charlie-3965.com/users/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      alert("Login successful");
      setUsername(loginUserID);
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setIsLoggedIn(false);
  };

  // Registration form fields
  const [registerName, setRegisterName] = useState('');
  const [registerUserID, setRegisterUserID] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Registration request function
  const handleRegister = async () => {
    try {
      const response = await fetch("https://meetokey.charlie-3965.com/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerName,
          userid: registerUserID,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      setShowRegister(false);
      setShowLogin(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // Meeting notes
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState({});
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMeetingsByDate(selectedDate);
    }
  }, [selectedDate, isLoggedIn]);

  const fetchMeetingsByDate = async (date) => {
    const token = localStorage.getItem("token");
    const [year, month, day] = date.split("-");
    const apiUrl = `http://:25114/meetings/by-date/${year}/${month}/${day}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Meetings not found");
      }
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error(error.message);
      setMeetings([]);
    }
  };

  const navigate = useNavigate();

  const handleMicClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to record a meeting");
      handleLoginShow();
      return;
    }
    
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      const currentNotes = newNotes[selectedDate] || [];
      const newNote = `Meeting note ${selectedDate}(${currentNotes.length + 1})`;
      newNotes[selectedDate] = [...currentNotes, newNote];
      return newNotes;
    });

    // JWT token retrieval
    const token = localStorage.getItem("token");

    // Navigate to Recording page
    navigate('/recording', { state: { token } });
  };

  return (
    <PageContainer>
      <div className="px-4 vh-100 d-flex flex-column">
        <Header>
          <LogoText>
            <h1>📔 Meet Okey!</h1>
          </LogoText>
          <LoginContainer>
            {isLoggedIn ? (
              <>
                <WelcomeText>Welcome, {username}!</WelcomeText>
                <AuthButton onClick={handleLogout}>
                  Logout
                </AuthButton>
              </>
            ) : (
              <AuthButton onClick={handleLoginShow}>
                Login
              </AuthButton>
            )}
          </LoginContainer>
        </Header>

        <MainContainer>
          <ContentCard>
            <RecordPrompt>Record your meeting</RecordPrompt>
            <MicButton onClick={handleMicClick}>
              <span>🎙️</span>
            </MicButton>
            <RecordHint>Click the microphone to start recording</RecordHint>
          </ContentCard>
        </MainContainer>

        <MeetingSection>
          <NoteContainer>
            <NoteHeader>
              <span>{selectedDate} Meeting Notes</span>
            </NoteHeader>
            <NoteContent>
              {meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                  <NoteItem key={index}>
                    <span>Meeting ID: {meeting.id}</span>
                    <ActionButton>
                      <i className="bi bi-eye"></i>
                    </ActionButton>
                  </NoteItem>
                ))
              ) : (
                <EmptyState>
                  <i className="bi bi-calendar-x"></i>
                  <p>No meetings found for this date</p>
                </EmptyState>
              )}
            </NoteContent>
          </NoteContainer>
          
          <CalendarContainer>
            <CalendarHeader>Calendar</CalendarHeader>
            <StyledCalendar
              onChange={(date) => setSelectedDate(date.toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(/\.$/, ""))}
              value={new Date(selectedDate)}
              className="custom-calendar"
            />
          </CalendarContainer>
        </MeetingSection>

          <LoginModal
    showLogin={showLogin}
    handleLoginClose={handleLoginClose}
    loginUserID={loginUserID}
    setLoginUserID={setLoginUserID}
    loginPassword={loginPassword}
    setLoginPassword={setLoginPassword}
    handleLogin={handleLogin}
    handleRegisterShow={handleRegisterShow}
  />


        {/* Registration Modal */}
        <StyledModal show={showRegister} onHide={handleRegisterClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <InputField
              type="text"
              placeholder="ID"
              value={registerUserID}
              onChange={(e) => setRegisterUserID(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <ModalButton secondary onClick={handleRegisterClose}>
              Close
            </ModalButton>
            <ModalButton accent onClick={handleRegister}>
              Sign Up
            </ModalButton>
          </Modal.Footer>
        </StyledModal>
      </div>
    </PageContainer>
  );
}

export default Homepage;

// Styled Components
const PageContainer = styled.div`
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
  position: relative;
  z-index: 10;
  margin-bottom: 20px;
`;

const LogoText = styled.div`
  h1 {
    font-weight: bold;
    font-size: 32px;
    color: #6A26CD;
    margin: 0;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const WelcomeText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #555;
  font-weight: 500;
`;

const AuthButton = styled.button`
  background-color: #6A26CD;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #8A45E5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(106, 38, 205, 0.2);
  }
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 30px;
`;

const ContentCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.1);
  width: 100%;
  max-width: 600px;
`;

const RecordPrompt = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #6A26CD;
  margin-bottom: 30px;
  text-align: center;
`;

const MicButton = styled.button`
  height: 120px;
  width: 120px;
  background-color: #fff;
  border: 3px solid #6A26CD;
  border-radius: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(106, 38, 205, 0.15);
  transition: all 0.3s ease;
  
  span {
    font-size: 60px;
  }
  
  &:hover {
    background-color: #F4EEFF;
    transform: scale(1.1);
    box-shadow: 0 12px 24px rgba(106, 38, 205, 0.2);
  }
`;

const RecordHint = styled.p`
  font-size: 14px;
  color: #777;
  text-align: center;
`;

const MeetingSection = styled.div`
  flex: 1;
  display: flex;
  gap: 30px;
  padding: 0 30px 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const NoteContainer = styled.div`
  flex: 7;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const NoteHeader = styled.div`
  padding: 16px 24px;
  background-color: #6A26CD;
  color: white;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoteContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const NoteItem = styled.div`
  padding: 16px;
  background-color: #F9F5FF;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #F4EEFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(106, 38, 205, 0.1);
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #6A26CD;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    color: #8A45E5;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #aaa;
  
  i {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 16px;
  }
`;

const CalendarContainer = styled.div`
  flex: 3;
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.1);
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

const StyledCalendar = styled(Calendar)`
  width: 100% !important;
  border: none !important;
  
  .react-calendar__navigation {
    margin-bottom: 16px;
  }
  
  .react-calendar__navigation button {
    color: #6A26CD;
    font-weight: 600;
  }
  
  .react-calendar__tile {
    border-radius: 8px;
    height: 40px;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .react-calendar__tile:hover {
    background-color: #F4EEFF;
  }
  
  .react-calendar__tile--now {
    background-color: #E6D8FF !important;
    color: #6A26CD !important;
    font-weight: 600;
  }
  
  .react-calendar__tile--active {
    background-color: #6A26CD !important;
    color: white !important;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    color: #6A26CD;
    font-weight: 600;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 24px;
    
    .modal-title {
      font-weight: 600;
      color: #6A26CD;
    }
  }
  
  .modal-body {
    padding: 24px;
  }
  
  .modal-footer {
    border-top: 1px solid #f0f0f0;
    padding: 16px 24px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6A26CD;
    box-shadow: 0 0 0 2px rgba(106, 38, 205, 0.1);
    outline: none;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const ModalButton = styled.button`
  background-color: ${props => props.secondary ? 'white' : props.accent ? '#A076EB' : '#6A26CD'};
  color: ${props => props.secondary ? '#6A26CD' : 'white'};
  border: ${props => props.secondary ? '1px solid #6A26CD' : 'none'};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.secondary ? '#F4EEFF' : props.accent ? '#B38FF0' : '#8A45E5'};
    transform: translateY(-2px);
  }
`;