import React from "react";
import "../../styles/TopicTimeline.css";

const TopicTimeline = ({ topics, currentTime }) => {
  const totalDuration = currentTime || 1;

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${min}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timeline-wrapper">
      {topics.map((topic, index) => {
  const start = topic.time;
  const end = topics[index + 1]?.time || currentTime;
  const widthPercent = ((end - start) / totalDuration) * 100;

  return (
    <div
      key={index}
      className={`timeline-segment ${index === topics.length - 1 ? "active" : ""}`}
      style={{ width: `${widthPercent}%` }}
      title={`${topic.name} (${formatTime(start)} ~ ${formatTime(end)})`}
    >
      <span className="segment-label">
        {topic.name} ({formatTime(start)} ~ {formatTime(end)})
      </span>
    </div>
  );
})}

    </div>
  );
};

export default TopicTimeline;
