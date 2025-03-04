import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import mic from '../assets/imgs/mic-remove.png';

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

  //login, logout 기능
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // JWT 디코딩
        setUsername(decoded.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // 로그인 폼 필드 상태
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const handleLogin = async () => {
    // FormData 객체를 사용하여 Form 데이터를 구성합니다.
    const formData = new FormData();
    formData.append("userid", loginUserID);
    formData.append("password", loginPassword);

    console.log("loginUserID:", loginUserID);
    console.log("loginPassword:", loginPassword);


    try {
      // 백엔드 URL: https://meetokey.charlie-3965.com/users/login
      const response = await fetch("https://meetokey.charlie-3965.com/users/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
      // 백엔드에서 "access_token"과 "token_type"을 반환한다고 가정합니다.
      localStorage.setItem("token", data.access_token);
      alert("로그인 성공");
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

  // 회원가입 폼 필드 상태
  const [registerName, setRegisterName] = useState('');
  const [registerUserID, setRegisterUserID] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // 회원가입 요청 함수
  const handleRegister = async () => {
    try {
      // 백엔드 URL: https://meetokey.charlie-3965.com/users/
      const response = await fetch("https://meetokey.charlie-3965.com/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerName,   // 사용자의 이름 (예: 한글 이름)
          userid: registerUserID,   // 로그인 아이디 (유니크)
          password: registerPassword,
        }),
      });

      console.log("registerName:", registerName);
      console.log("registerUserID:", registerUserID);
      console.log("registerPassword:", registerPassword);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "회원가입 실패");
      }

      alert("회원가입 성공! 로그인 해주세요.");
      setShowRegister(false);
      setShowLogin(true);
    } catch (error) {
      alert(error.message);
    }
  };

  //회의록
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
      alert(error.message);
      setMeetings([]);
    }
  };

  const navigate = useNavigate();

  const handleMicClick = () => {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      const currentNotes = newNotes[selectedDate] || [];
      const newNote = `Meeting note ${selectedDate}(${currentNotes.length + 1})`;
      newNotes[selectedDate] = [...currentNotes, newNote];
      return newNotes;
    });


    // JWT 토큰 가져오기
    const token = localStorage.getItem("token");

    // Recording 페이지로 이동
    navigate('/recording', { state: { token } });
  };


  return (
    <PageContainer>
      <div className="px-5 vh-100 d-flex flex-column">
        <Header>
          <LogoText>
            <h1 style={{ fontWeight: 'bold', fontSize: '55px' }}>
              📔 Meet Okey!
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

          <MicButton style={{ backgroundColor: '#ffffff', borderColor: '#9275BF' }} onClick={handleMicClick}>🎙️ </MicButton>

        </MainContainer>


        <MeetingSection>
          <NoteContainer>
            <div className="col-12 p-3">
              <div className="note-title">{selectedDate} Meeting Notes</div> {/* 제목 추가 */}

              <ul className="list-group">
                {meetings.length > 0 ? (
                  meetings.map((meeting, index) => (
                    <li key={index} className="list-group-item">{`Meeting ID: ${meeting.id}`}</li>
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
                onChange={(date) => setSelectedDate(date.toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(/\.$/, ""))}
                value={new Date(selectedDate)}
                className="custom-calendar"
              />
            </div></CalenderContainer>

        </MeetingSection>

        {/* LogIn Modal */}
        <Modal show={showLogin} onHide={handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>LogIn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              id="loginUserID"
              className="form-control mb-2"
              placeholder="ID"
              value={loginUserID}
              onChange={(e) => setLoginUserID(e.target.value)}
            />
            <input
              type="password"
              id="loginPassword"
              className="form-control mb-2"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
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
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="ID"
              value={registerUserID}
              onChange={(e) => setRegisterUserID(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: '#8A2BE2', borderColor: '#8A2BE2', color: '#fff' }} onClick={handleRegisterClose}>
              Close
            </Button>
            <Button style={{ backgroundColor: '#BA55D3', borderColor: '#BA55D3', color: '#fff' }} onClick={handleRegister}>
              SignUp
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </PageContainer>
  );
};

export default Homepage;

const PageContainer = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom left, #ffffff, #CBC9EF);
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
  color:#3A215B;
  justify-content: center;  /* 헤더 내 요소 중앙 정렬 */
  position: relative; /* 절대 위치 요소를 위한 설정 */
  justify-content: center;  /* 헤더 내 요소 중앙 정렬 */
  position: relative; /* 절대 위치 요소를 위한 설정 */
`;

const LogoText = styled.div`
  font-size: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  padding: 30px;
  background-color: #ffffff;
  border: none;
  border-radius: 300px;
  cursor: pointer;
  font-size: 90px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(146, 117, 191, 0.5); /* 보라색 테두리 */
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
  height: 100%;
  width: 2000px;
  width: 2000px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 26px;
  margin-right: 40px;
  box-shadow: 0px 4px 10px lightgray;
  position: relative; /* 내부 요소 고정 가능하도록 설정 */


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
    width: 100%; /* 리스트 그룹이 컨테이너 너비를 꽉 채우도록 */
    margin-top: 40px; /* 제목 아래에 공간 추가 */
  }

  .list-group-item {
    background: #ffffff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border: none; /* 기존 list-group의 테두리 제거 */
    width: 100%;
  }
  position: relative; /* 내부 요소 고정 가능하도록 설정 */


 
`;



const CalenderContainer = styled.div`
  height: 150%;
  width: 500px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: center; /* 캘린더를 중앙에 정렬 */
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
  border: 1px solid #ffffff;

  .react-calendar__tile {
    font-size: 18px !important;
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
