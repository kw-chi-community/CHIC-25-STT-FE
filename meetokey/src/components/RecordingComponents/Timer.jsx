import React from "react";
import "../../styles/Timer.css"; // ✅ CSS 파일 import

const Timer = ({ seconds }) => {
    return (
        <p className="timer-display">⏱ {seconds}초째 녹음 중</p>
    );
};

export default Timer;
