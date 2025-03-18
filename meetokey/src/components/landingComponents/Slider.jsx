import React, { useState } from 'react';
import LoginModal from '../../pages/LoginModal'; // 수정된 경로


const Slider = (props) => {
  const [showLogin, setShowLogin] = useState(false); // 로그인 모달 상태
  const [loginUserID, setLoginUserID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 모달 열기
  const handleLoginShow = () => setShowLogin(true);

  // 로그인 모달 닫기
  const handleLoginClose = () => setShowLogin(false);

  // 로그인 처리
  const handleLogin = () => {
    if (loginUserID === '' || loginPassword === '') {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    // 로그인 로직 (예시로 단순하게 로그인 체크)
    if (loginUserID === 'admin' && loginPassword === 'admin123') {
      alert('로그인 성공');
      setShowLogin(false); // 로그인 후 모달 닫기
    } else {
      setErrorMessage('아이디나 비밀번호가 잘못되었습니다.');
    }
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
                <a href="/" onClick={handleLoginShow}>로그인</a> {/* 로그인 모달 열기 */}
                <a href="/" className="black">회원가입</a>
              </div>
            </div>
          </div>
          <div className="slider__arrow">
            <a href="/" className="left"><span className="ir">이전 이미지</span></a>
            <a href="/" className="right"><span className="ir">다음 이미지</span></a>
          </div>
          <div className="slider__dot">
            <a href="/" className="dot active"><span className="ir">1</span></a>
            <a href="/" className="dot"><span className="ir">2</span></a>
            <a href="/" className="dot"><span className="ir">3</span></a>
            <a href="/" className="play"><span className="ir">플레이</span></a>
            <a href="/" className="stop"><span className="ir">정지</span></a>
          </div>
        </div>
      </div>

      {/* 로그인 모달 전달 */}
      <LoginModal
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        loginUserID={loginUserID}
        setLoginUserID={setLoginUserID}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        handleLogin={handleLogin}
        handleRegisterShow={() => alert('회원가입 페이지로 이동')} // 회원가입 페이지로 이동
        errorMessage={errorMessage} // 로그인 실패 시 에러 메시지 표시
      />
    </section>
  );
};

export default Slider;
