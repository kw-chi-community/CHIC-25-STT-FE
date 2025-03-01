//녹음된 오디오 파일을 재생할 수 있는 오디오 플레이어 제공.
import React from "react";
import "../../styles/AudioPlayer.css";


const AudioPlayer = ({ audioUrl }) => {
    if (!audioUrl) return null;

    return (
        <div className="mt-4">
            <p>🎧 녹음된 오디오</p>
            <audio controls src={audioUrl}></audio>
        </div>
    );
};

export default AudioPlayer;
