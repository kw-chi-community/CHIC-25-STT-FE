import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";

const LoginModal = ({
  showLogin,
  handleLoginClose,
  loginUserID,
  setLoginUserID,
  loginPassword,
  setLoginPassword,
  handleLogin,
  handleRegisterShow,
  errorMessage
}) => {
  return (
    <StyledModal show={showLogin} onHide={handleLoginClose} centered>
      <Modal.Header>
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
        {/* Display error message */}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Modal.Body>
      <Modal.Footer>
    
  <ModalButton onClick={handleLogin}>
   로그인
  </ModalButton>
  <ModalButton signup onClick={handleRegisterShow}>
    회원가입
  </ModalButton>

      </Modal.Footer>
    </StyledModal>
  );
};

export default LoginModal;

// Styled Components
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    border-bottom: 1px solid #ccc;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-title {
    font-size: 30px; /* 기존 header__logo와 동일 */
    font-weight: 700; /* 기존 header__logo와 동일 */
    text-transform: uppercase;
    color: rgb(0, 0, 0);
  }

  .modal-body {
    padding: 24px;
  }

  .modal-footer {
    border-top: 1px solid #ccc;
    padding: 16px 24px;
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
    gap: 10px; /* 버튼 간격 추가 */
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px; /* 기존 사이트 폰트 크기와 통일 */
  font-weight: 300; /* 기존 card__body .desc와 동일 */
  transition: all 0.2s ease;
  background: #f8f8f8;

  &:focus {
    border-color: #6A26CD;
    box-shadow: 0 0 0 2px rgba(106, 38, 205, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #666;
    font-size: 14px;
    font-weight: 300;
  }
`;

const ModalButton = styled.button`
  background-color: ${(props) =>
    props.signup ? "white" : "#6A26CD"};
  color: ${(props) => (props.signup ? "#6A26CD" : "white")};
  border: ${(props) => (props.signup ? "2px solid #6A26CD" : "none")};
  border-radius: 50px; /* 기존 버튼 스타일과 통일 */
  padding: 10px 30px;
  font-size: 16px; /* 기존 버튼 스타일과 동일 */
  font-weight: 600; /* 기존 버튼 스타일과 동일 */
  cursor: pointer;
  transition: all 0.33s ease;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) =>
      props.signup ? "#F4EEFF" : "#8A45E5"};
    transform: translateY(-2px);
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
`;

