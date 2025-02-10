import React from "react";

const MeetingSummary = ({ summary, keywords }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">요약 / 키워드</h2>
            <p className="text-gray-700 mb-4">{summary}</p>
            <div className="flex flex-wrap space-x-2">
                {keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MeetingSummary;
