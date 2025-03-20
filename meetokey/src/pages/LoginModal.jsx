import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";

const LoginModal = ({
  showLogin,
  handleLoginClose,
  showRegister,
  handleRegisterClose,
  handleRegisterShow,
  loginUserID,
  setLoginUserID,
  loginPassword,
  setLoginPassword,
  handleLogin,
  errorMessage,
}) => {
  return (
    <>
      {/* 로그인 모달 */}
      <StyledModal show={showLogin} onHide={handleLoginClose} centered>
        <Modal.Header closeButton> {/* X 닫기 버튼 복구 */}
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField
            type="text"
            placeholder="ID"
            value={loginUserID}
            onChange={(e) => setLoginUserID(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={handleLogin}>로그인</ModalButton>
          <ModalButton signup onClick={handleRegisterShow}>회원가입</ModalButton>
        </Modal.Footer>
      </StyledModal>

      {/* 회원가입 모달 */}
      <StyledModal show={showRegister} onHide={handleRegisterClose} centered>
        <Modal.Header closeButton> {/* X 닫기 버튼 복구 */}
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField type="text" placeholder="Name" />
          <InputField type="text" placeholder="ID" />
          <InputField type="password" placeholder="Password" />
        </Modal.Body>
        <Modal.Footer>

          <ModalButton signup>회원가입</ModalButton>
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default LoginModal;

// Styled Components (디자인 원래대로 복구)
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 6px; /* 기존 10px에서 6px로 변경 (더 각지게) */
    border: none;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    padding: 20px;
  }

  .modal-header {
    border-bottom: none; /* 검정색 선 제거 */
    padding: 20px 24px;
  }

  .modal-header .btn-close {
    color: #6A26CD; /* 닫기 버튼 색상 보라색 유지 */
    opacity: 1;
    pointer-events: auto; /* 클릭 가능하도록 변경 */
  }

  .modal-body {
    padding: 24px;
  }

  .modal-footer {
    border-top: none; /* 검정색 선 제거 */
    padding: 16px 24px;
    display: flex;
    justify-content: flex-end;
    gap: 0px; /* 버튼 사이 간격 제거 */
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: #f8f8f8;

  &:focus {
    border-color: #6a26cd;
    box-shadow: 0 0 0 2px rgba(106, 38, 205, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #666;
    font-size: 14px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalButton = styled.button`
  width: 120px; /* 버튼 너비 동일 */
  height: 44px; /* 버튼 높이 동일 */
  font-size: 16px;
  font-weight: normal; /* 글씨체 볼드 제거 */
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border-radius: 0; /* 둥근 모서리 제거 */
   border: 2px solid #6A26CD; /* 전체 테두리 유지 */
  margin: 0;
  padding: 0;

  background-color: ${(props) => (props.signup ? "white" : "#6A26CD")};
  color: ${(props) => (props.signup ? "#6A26CD" : "white")};

  &:hover {
    background-color: ${(props) => (props.signup ? "#F4EEFF" : "#8A45E5")};
  }
`;



const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
`;
