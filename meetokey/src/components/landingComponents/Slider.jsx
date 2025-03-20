import React, { useState } from 'react';
import LoginModal from '../../pages/LoginModal';

const Slider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 모달 열기
  const handleLoginShow = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  // 로그인 모달 닫기
  const handleLoginClose = () => {
    setShowLogin(false);
  };

  // 회원가입 모달 열기
  const handleRegisterShow = () => {
    setShowLogin(false); // 로그인 모달 닫기
    setShowRegister(true); // 회원가입 모달 열기
  };

  // 회원가입 모달 닫기
  const handleRegisterClose = () => {
    setShowRegister(false);
  };

  return (
    <section id="sliderType" className={`slider__wrap ${props.element}`}>
      <h2 className="blind">슬라이드 유형</h2>
      <div className="slider__inner">
        <div className="slider">
          <div className="slider__img">
            <div className="desc">
              <h3>MEET OKEY</h3>
              <p>
                <br />
                똑똑한 회의, 핵심만 딱!
                <br />
                음성을 자동으로 정리해 아이디어를 키워드별로 시각화하는 스마트 회의 솔루션!
              </p>
              <div className="btn">
                <a href="/" onClick={(e) => { e.preventDefault(); handleLoginShow(); }}>
                  로그인
                </a> 
                <a href="/" className="black" onClick={(e) => { e.preventDefault(); handleRegisterShow(); }}>
                  회원가입
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로그인 & 회원가입 모달 */}
      <LoginModal
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        showRegister={showRegister}
        handleRegisterClose={handleRegisterClose}
        handleRegisterShow={handleRegisterShow}
        loginUserID={loginUserID}
        setLoginUserID={setLoginUserID}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        errorMessage={errorMessage}
      />
    </section>
  );
};

export default Slider;
