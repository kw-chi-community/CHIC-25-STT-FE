import React from "react";

const AudioPlayback = ({ audioUrl }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = "recording.mp3";
        link.click();
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">녹음본 조회</h2>
            <audio controls src={audioUrl} className="w-full"></audio>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleDownload}
            >
                다운로드
            </button>
        </div>
    );
};

export default AudioPlayback;
