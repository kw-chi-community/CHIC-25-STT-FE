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
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerUserID, setRegisterUserID] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [meetings, setMeetings] = useState([]);
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUsername(decoded.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMeetingsByDate(selectedDate);
    }
  }, [selectedDate, isLoggedIn]);

  const fetchMeetingsByDate = async (date) => {
    const token = localStorage.getItem("token");
    const [year, month, day] = date.split("-");
    const apiUrl = `http://112.152.14.116:25114/meetings/by-date/${year}/${month}/${day}`;

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

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("userid", loginUserID);
    formData.append("password", loginPassword);

    try {
      const response = await fetch("http://112.152.14.116:25114/users/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
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

  const handleRegister = async () => {
    try {
      const response = await fetch("http://112.152.14.116:25114/users/", {
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
        throw new Error(errData.detail || "회원가입 실패");
      }

      alert("회원가입 성공! 로그인 해주세요.");
      setShowRegister(false);
      setShowLogin(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMicClick = () => {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      const currentNotes = newNotes[selectedDate] || [];
      const newNote = `Meeting note ${selectedDate}(${currentNotes.length + 1})`;
      newNotes[selectedDate] = [...currentNotes, newNote];
      return newNotes;
    });
    navigate('/recording');
  };

  return <></>; // 내용 유지된 상태로 필요한 JSX 추가
}

export default Homepage;
