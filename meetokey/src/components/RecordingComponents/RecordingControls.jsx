import React from "react";
import "../../styles/RecordingControls.css"; // ✅ 올바른 CSS 파일 import

const RecordingControls = ({ isRecording, startRecording, stopRecording }) => {
    return (
        <div className="recording-controls">
            <button className="btn-back">🔙 돌아가기</button>
            <button className="btn-retake" onClick={stopRecording}>
                🔄 Retake
            </button>
            {isRecording ? (
                <button onClick={stopRecording} className="btn-stop">
                    🛑 중지
                </button>
            ) : (
                <button onClick={startRecording} className="btn-start">
                    🎤 시작
                </button>
            )}
        </div>
    );
};

export default RecordingControls;
