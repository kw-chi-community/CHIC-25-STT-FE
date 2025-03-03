import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/RecordingControls.css"; 

const RecordingControls = ({ isRecording, startRecording, stopRecording }) => {
    const navigate = useNavigate(); 

    return (
        <div className="recording-controls">
            {/* ✅ Home("/")으로 이동 */}
            <button className="btn-back" onClick={() => navigate("/")}>🔙 돌아가기</button>
            
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
