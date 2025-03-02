import React from "react";
import "../../styles/AudioModal.css"; // ✅ 스타일 파일 추가

const AudioModal = ({ isOpen, onClose, audioUrl, onDownload }) => {
    if (!isOpen || !audioUrl) return null;

    return (
        <div className="audio-modal-overlay">
            <div className="audio-modal-content">
                <button className="close-button" onClick={onClose}>×</button> {/* ✅ X 버튼 추가 */}
                <h2 className="modal-title">🎧 녹음된 오디오</h2>
                <audio controls src={audioUrl} className="audio-player"></audio>
                <button className="download-btn" onClick={onDownload}>
                    📥 녹음 다운로드
                </button>
            </div>
        </div>
    );
};

export default AudioModal;
