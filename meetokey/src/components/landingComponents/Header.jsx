import React, { useState } from 'react';
import '../../styles/Landing.css';
import LoginModal from '../../pages/LoginModal'; // LoginModal import 추가
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate(); // ✅ 라우터 함수 생성

    const handleMeetingStart = (e) => {
        e.preventDefault();
        navigate("/recording"); // ✅ 녹음 페이지로 이동
    };

    const handleMeetingDashboard = (e) => {
        e.preventDefault();
        navigate("/date"); 
    };
    

    const [showLogin, setShowLogin] = useState(false); // 로그인 모달 상태 관리
    const [showRegister, setShowRegister] = useState(false); // 회원가입 모달 상태 관리

    const handleLoginShow = () => {
        setShowLogin(true);
        setShowRegister(false);
    };
    
    const handleLoginClose = () => setShowLogin(false);
    
    const handleRegisterShow = () => {
        setShowLogin(false); // 로그인 모달 닫고
        setShowRegister(true); // 회원가입 모달 열기
    };

    const handleRegisterClose = () => setShowRegister(false);

    return (
        <>
       <header id="landing-headerType" className={`landing-header__wrap ${props.element}`}>
            <div className="landing-header__inner">
                <div className="landing-header__logo">
                    <a href="/">MEET OKEY</a>
                </div>
                <nav className="landing-header__menu">
                    <ul>
                        <li>
                            <a href="/" onClick={handleMeetingStart}>회의 시작</a>
                        </li>
                        <li>
    <a href="/" onClick={handleMeetingDashboard}>회의록 보기</a>
</li>

                    </ul>
                </nav>
                <div className="landing-header__member">
                    <a href="/" onClick={(e) => { e.preventDefault(); handleLoginShow(); }}>
                        로그인
                    </a>
                </div>
            </div>
        </header>

            {/* 로그인 & 회원가입 모달 추가 */}
            <LoginModal
                showLogin={showLogin}
                handleLoginClose={handleLoginClose}
                showRegister={showRegister}
                handleRegisterClose={handleRegisterClose}
                handleRegisterShow={handleRegisterShow} // 회원가입 버튼 클릭 시 회원가입 모달 열기
                loginUserID=""
                setLoginUserID={() => {}}
                loginPassword=""
                setLoginPassword={() => {}}
                handleLogin={() => {}}
                errorMessage=""
            />
        </>
    );
};

export default Header;


