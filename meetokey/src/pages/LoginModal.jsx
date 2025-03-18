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
      <Modal.Header closeButton>
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
        <ModalButton secondary onClick={handleLoginClose}>
          Close
        </ModalButton>
        <ModalButton onClick={handleLogin}>
          Login
        </ModalButton>
        <ModalButton accent onClick={handleRegisterShow}>
          Sign Up
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

// Error message style
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
`;
