import React from "react";

const MeetingHeader = ({ meetingName, meetingDate, duration }) => {
    return (
        <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">{meetingName}</h1>
            <p className="text-gray-600">
                {meetingDate} · {duration}
            </p>
        </div>
    );
};

export default MeetingHeader;
