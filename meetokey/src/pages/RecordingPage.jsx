import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/RecordingPage.css";

import RecordingModal from "../components/RecordingComponents/Modal";
import Header from "../components/RecordingComponents/Header";
import Timer from "../components/RecordingComponents/Timer";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioPlayer from "../components/RecordingComponents/AudioPlayer";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [meetingName, setMeetingName] = useState("");
    const [topic, setTopic] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null); // ✅ 녹음된 오디오 저장용

    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]); // ✅ 녹음된 오디오 데이터 저장
    const mediaStreamRef = useRef(null); // ✅ 마이크 스트림 저장용

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

        let interval;
        if (isRecording) {
            interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
            clearInterval(interval);
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isRecording, navigate]);

    // ✅ 마이크 스트림 초기화
    const initializeMediaStream = async () => {
        try {
            console.log("🎤 마이크 권한 요청 중...");
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("이 브라우저는 MediaStream API를 지원하지 않습니다.");
            }

            const constraints = { audio: true }; // ✅ 오디오만 가져오기
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaStreamRef.current = stream;
            console.log("✅ 마이크 접근 성공");
        } catch (error) {
            console.error("🚫 마이크 접근 실패:", error);
            alert("🚨 마이크 사용이 허용되지 않았습니다. 브라우저 설정을 확인하세요.");
        }
    };

    useEffect(() => {
        initializeMediaStream(); // ✅ 마운트 시 미디어 스트림 가져오기
    }, []);

    // ✅ 녹음 시작
    const startRecording = () => {
        try {
            if (!mediaStreamRef.current) {
                console.error("🚨 MediaStream이 존재하지 않습니다.");
                return;
            }

            setIsRecording(true);
            audioChunks.current = []; // 새로운 녹음 시작 시 기존 데이터 초기화

            const recorder = new MediaRecorder(mediaStreamRef.current);
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                console.log("🛑 녹음이 멈춤, 오디오 데이터 저장 중...");
                const blob = new Blob(audioChunks.current, { type: "audio/wav" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                console.log("🎧 오디오 저장 완료:", url);
            };

            recorder.start();
            console.log("🎙 녹음 시작됨");
        } catch (error) {
            console.error("🚫 녹음 시작 중 오류:", error);
        }
    };

    // ✅ 녹음 중지
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log("🛑 녹음 중지됨");
            setIsRecording(false);
        }
    };

    return (
        <div className="recording-page">
            {showModal ? (
                <RecordingModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onStart={(name, topic) => {
                        setMeetingName(name);
                        setTopic(topic);
                        setShowModal(false);
                    }}
                />
            ) : (
                <>
                    <Header meetingName={meetingName} topic={topic} />
                    <RecordingStatus isRecording={isRecording} />
                    <RecordingControls
                        isRecording={isRecording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                    />
                    <Timer seconds={seconds} />
                    {audioUrl && (
                        <div className="audio-player">
                            <h3>🎧 녹음된 오디오</h3>
                            <audio controls src={audioUrl}></audio>
                        </div>
                    )}
                    <TopicSwitcher onSwitch={setTopic} />
                </>
            )}
        </div>
    );
};

export default RecordingPage;
