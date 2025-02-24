import React from "react";

const Header = ({ meetingName, topic }) => {
    return (
        <div className="header-container">
            <h1 className="header-title">{meetingName || "회의명 없음"}</h1>
            <h2 className="header-topic">{topic || "주제 없음"}</h2>
        </div>
    );
};

export default Header;
