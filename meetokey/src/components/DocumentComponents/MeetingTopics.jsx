import React from "react";

const MeetingTopics = ({ topics, deleteTopic, deleteDetail }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">주제별 회의 내용</h2>
            {topics.length > 0 ? (
                topics.map((topic) => (
                    <div key={topic.id} className="mb-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">{topic.title}</h3>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => deleteTopic(topic.id)}
                            >
                                삭제
                            </button>
                        </div>
                        <ul className="list-disc ml-6 mt-2">
                            {topic.details.map((detail, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="text-gray-700">{detail}</span>
                                    <button
                                        className="text-red-500 text-sm"
                                        onClick={() => deleteDetail(topic.id, index)}
                                    >
                                        [삭제]
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default MeetingTopics;
