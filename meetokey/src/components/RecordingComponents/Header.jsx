//현재 회의명과 주제를 화면 상단에 표시.
import React from "react";


const Header = ({ meetingName, topic }) => {
    return (
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">{meetingName || "회의명 없음"}</h1>
            <h2 className="text-xl">{topic || "주제 없음"}</h2>
        </div>
    );
};

export default Header;
