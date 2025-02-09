//초기 설정(회의명, 주제)을 입력받는 모달 창.
import React, { useState } from "react";

const RecordingModal = ({ isOpen, onClose, onStart }) => {
    const [meetingName, setMeetingName] = useState("");
    const [topic, setTopic] = useState("");

    const handleStart = () => {
        onStart(meetingName, topic);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">회의 정보 입력</h2>
                <input
                    type="text"
                    placeholder="회의명 입력"
                    className="w-full p-2 border rounded mb-2"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="시작 주제 입력"
                    className="w-full p-2 border rounded mb-2"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded w-full"
                    onClick={handleStart}
                >
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default RecordingModal;
