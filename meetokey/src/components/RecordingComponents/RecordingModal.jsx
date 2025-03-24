import React, { useState } from "react";
import "../../styles/RecordingModal.css"; // 위에 작성한 CSS 파일 import

const RecordingModal = ({ isOpen, onClose, onStart }) => {
  const [meetingName, setMeetingName] = useState("");
  const [topic, setTopic] = useState("");

  const handleStart = () => {
    if (meetingName.trim() === "" || topic.trim() === "") {
      alert("회의명과 주제를 입력하세요!");
      return;
    }
    onStart(meetingName, topic);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">회의 정보 입력</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="회의명을 입력하세요"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <input
          className="modal-input"
          type="text"
          placeholder="주제를 입력하세요"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className="modal-button" onClick={handleStart}>
          시작하기
        </button>
      </div>
    </div>
  );
};

export default RecordingModal;
