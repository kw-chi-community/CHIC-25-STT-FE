//녹음 제어 버튼(돌아가기, Retake, 중지, 시작)을 제공.
import React from "react";

const RecordingControls = ({ isRecording, startRecording, stopRecording }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-2xl mt-6">
            <button className="bg-gray-300 px-4 py-2 rounded">🔙 돌아가기</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={stopRecording}>
                🔄 Retake
            </button>
            {isRecording ? (
                <button
                    onClick={stopRecording}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    🛑 중지
                </button>
            ) : (
                <button
                    onClick={startRecording}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    🎤 시작
                </button>
            )}
        </div>
    );
};

export default RecordingControls;
