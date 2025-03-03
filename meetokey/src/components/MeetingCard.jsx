import React from "react";

const MeetingCard = ({ meeting }) => {
  return (
    <div className="meeting-card">
      <div className="meeting-card-header">
        <h3>{meeting.title}</h3>
      </div>
      <div className="meeting-card-details">
        <p>📅 {meeting.date}</p>
        <p>⏰ {meeting.time}</p>
      </div>
      <div className="meeting-card-categories">
        {meeting.categories.map((category, index) => (
          <span key={index} className="category-badge">{category}</span>
        ))}
      </div>
      <div className="meeting-card-topics">
        <small>주요 주제: {meeting.topics.join(", ")}</small>
      </div>
    </div>
  );
};

export default MeetingCard;
