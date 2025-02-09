//현재 녹음 상태를 텍스트로 표시.
import React from "react";

const RecordingStatus = ({ isRecording }) => {
    return (
        <p className={`text-xl font-bold mt-2 ${isRecording ? "text-red-500" : "text-gray-500"}`}>
            {isRecording ? "🔴 녹음 중..." : "🎤 녹음이 시작되지 않았습니다."}
        </p>
    );
};

export default RecordingStatus;
