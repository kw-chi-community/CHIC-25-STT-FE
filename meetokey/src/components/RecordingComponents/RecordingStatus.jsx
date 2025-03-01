import React from "react";
import "../../styles/RecordingStatus.css"; // ✅ CSS 파일 import

const RecordingStatus = ({ isRecording }) => {
    return (
        <p className={`recording-status ${isRecording ? "recording-active" : "recording-inactive"}`}>
            {isRecording ? "🔴 녹음 중" : " 대기 중🎤"}
        </p>
    );
};

export default RecordingStatus;
