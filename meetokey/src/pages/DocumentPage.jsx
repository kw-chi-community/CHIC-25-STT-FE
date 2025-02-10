import React, { useState } from "react";
import MeetingHeader from "../components/DocumentComponents/MeetingHeader";
import MeetingTopics from "../components/DocumentComponents/MeetingTopics";
import MeetingSummary from "../components/DocumentComponents/MeetingSummary";
import AudioPlayback from "../components/DocumentComponents/AudioPlayback";
import SearchBar from "../components/DocumentComponents/SearchBar";

const DocumentPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [meetingData, setMeetingData] = useState({
        meetingDate: "2023년 3월 23일 오후 4:52",
        meetingName: "주간 회의",
        topics: [
            {
                id: 1,
                title: "행사 아이디어 기획",
                details: [
                    "플리마켓과 버스킹 문화를 참고하여 문화 마켓 주제로 진행.",
                    "빈티지 소품과 먹거리를 결합한 행사 아이디어.",
                    "지역 음악 공연을 포함하여 진행."
                ]
            },
            {
                id: 2,
                title: "다음 행사 일정 준비",
                details: [
                    "행사 장소 확인 및 가격 계약 검토.",
                    "행사 홍보 전략 논의 및 메시지 준비.",
                    "행사 마무리 운영 스태프 모집."
                ]
            }
        ],
        summary: "지난 회의에서는 다양한 아이디어가 논의되었으며, 이번 회의에서는 플리마켓과 음악 공연이 포함된 주제로 진행 방향을 구체화하였습니다.",
        keywords: ["플리마켓", "버스킹", "문화 마켓", "음악 공연", "빈티지 소품"],
        audioUrl: "/path/to/audio.mp3" // 녹음본 URL
    });

    // 검색 기능
    const filteredTopics = meetingData.topics.filter(
        (topic) =>
            topic.title.includes(searchQuery) ||
            topic.details.some((detail) => detail.includes(searchQuery))
    );

    // 주제/세부 내용 삭제
    const deleteTopic = (id) => {
        setMeetingData((prevData) => ({
            ...prevData,
            topics: prevData.topics.filter((topic) => topic.id !== id)
        }));
    };

    const deleteDetail = (topicId, detailIndex) => {
        setMeetingData((prevData) => ({
            ...prevData,
            topics: prevData.topics.map((topic) =>
                topic.id === topicId
                    ? { ...topic, details: topic.details.filter((_, index) => index !== detailIndex) }
                    : topic
            )
        }));
    };

    return (
        <div className="p-6 space-y-6">
            {/* 헤더 */}
            <MeetingHeader
                meetingDate={meetingData.meetingDate}
                meetingName={meetingData.meetingName}
            />

            {/* 검색 바 */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* 주제별 회의 내용 */}
            <MeetingTopics
                topics={filteredTopics}
                deleteTopic={deleteTopic}
                deleteDetail={deleteDetail}
            />

            {/* 요약 및 키워드 */}
            <MeetingSummary summary={meetingData.summary} keywords={meetingData.keywords} />

            {/* 녹음본 재생 및 다운로드 */}
            <AudioPlayback audioUrl={meetingData.audioUrl} />
        </div>
    );
};

export default DocumentPage;
