//새 주제를 입력받아 주제를 변경.
import React, { useState } from "react";

const TopicSwitcher = ({ onSwitch }) => {
    const [newTopic, setNewTopic] = useState("");

    const handleSwitch = () => {
        if (newTopic) {
            onSwitch(newTopic);
            setNewTopic("");
        }
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                className="border px-2 py-1 rounded mr-2"
                placeholder="새 주제 입력"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
            />
            <button onClick={handleSwitch} className="bg-blue-500 text-white px-4 py-2 rounded">
                주제 변경
            </button>
        </div>
    );
};

export default TopicSwitcher;
