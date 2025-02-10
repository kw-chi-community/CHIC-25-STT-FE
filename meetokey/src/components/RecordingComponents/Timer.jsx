//현재 녹음 시간이 몇 초째인지 표시.
import React from "react";

const Timer = ({ seconds }) => {
    return (
        <p className="text-lg font-bold">⏱ {seconds}초째 녹음 중</p>
    );
};

export default Timer;
