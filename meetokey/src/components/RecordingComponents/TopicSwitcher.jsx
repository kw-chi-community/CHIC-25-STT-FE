import React, { useState } from "react";
import "../../styles/TopicSwitcher.css"; // ✅ CSS 파일 import

const TopicSwitcher = ({ onSwitch }) => {
    const [newTopic, setNewTopic] = useState("");

    const handleSwitch = () => {
        if (newTopic) {
            onSwitch(newTopic);
            setNewTopic("");
        }
    };

    return (
        <div className="topic-switcher">
            <input
                type="text"
                className="topic-input"
                placeholder="다음 주제 입력"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
            />
            <button onClick={handleSwitch} className="switch-button">
                주제 변경
            </button>
        </div>
    );
};

export default TopicSwitcher;
