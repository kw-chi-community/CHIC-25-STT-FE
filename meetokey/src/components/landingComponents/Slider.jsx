import React, { useState } from 'react';
import LoginModal from '../../pages/LoginModal';

const Slider = (props) => {
  const [showLogin, setShowLogin] = useState(false); 
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 모달 열기
  const handleLoginShow = () => {
    console.log("로그인 모달 열기"); // 상태 확인용
    setShowLogin(true);
  };

  // 로그인 모달 닫기
  const handleLoginClose = () => {
    console.log("로그인 모달 닫기"); // 상태 확인용
    setShowLogin(false);
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
                <a href="/" className="black">회원가입</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        loginUserID={loginUserID}
        setLoginUserID={setLoginUserID}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        handleRegisterShow={() => alert('회원가입 페이지로 이동')}
        errorMessage={errorMessage}
      />
    </section>
  );
};

export default Slider;
