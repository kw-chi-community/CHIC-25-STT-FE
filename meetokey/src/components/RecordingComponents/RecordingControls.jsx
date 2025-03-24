import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/RecordingControls.css"; 

const RecordingControls = ({ isRecording, startRecording, stopRecording }) => {
    const navigate = useNavigate(); 
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleStopClick = () => {
        setShowConfirmModal(true); // 모달 열기
    };

    const handleConfirmStop = () => {
        stopRecording(); // 진짜 중지
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setShowConfirmModal(false); // 모달 닫기
    };

    return (
        <div className="recording-controls">
            {isRecording ? (
                <button onClick={handleStopClick} className="btn-stop">
                    🛑 중지
                </button>
            ) : (
                <button onClick={startRecording} className="btn-start">
                    🎤 시작
                </button>
            )}

            {showConfirmModal && (
                <div className="confirm-modal-overlay">
                    <div className="confirm-modal">
                        <p>정말 녹음을 중지할까요?</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmStop} className="btn-confirm">네</button>
                            <button onClick={handleCancel} className="btn-cancel">아니오</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordingControls;
