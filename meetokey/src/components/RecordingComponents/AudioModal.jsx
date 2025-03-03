import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 네비게이션 훅 추가
import "../../styles/AudioModal.css";  // ✅ 올바른 import 경로 (src/styles/AudioModal.css)

const AudioModal = ({ isOpen, onClose, audioUrl, onDownload }) => {
    const navigate = useNavigate(); // ✅ 페이지 이동 함수

    if (!isOpen || !audioUrl) return null;

    return (
        <div className="audio-modal-overlay">
            <div className="audio-modal-content">
                <button className="close-button" onClick={onClose}>×</button> {/* ✅ 닫기 버튼 */}
                <h2 className="modal-title">🎧 녹음된 오디오</h2>
                <audio controls src={audioUrl} className="audio-player"></audio>

                {/* ✅ 버튼 그룹 */}
                <div className="modal-buttons">
                    <button className="download-btn" onClick={onDownload}>
                        📥 녹음 다운로드
                    </button>
                    <button className="document-btn" onClick={() => navigate("/dashboard")}>
                        📄 회의록 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioModal;
