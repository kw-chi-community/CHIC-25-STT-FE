import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/RecordingPage.css"; // ✅ CSS 파일 import 추가

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
    const [audioUrl, setAudioUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const websocketRef = useRef(null);
    const audioChunks = useRef([]);

    // ✅ JWT 토큰 확인 후 로그인 안 되어 있으면 홈으로 이동
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

    // 🚀 오디오 스트림 가져오기 (마이크 권한 요청 & 설정 페이지 자동 열기)
    const getAudioStream = async () => {
        try {
            console.log("🎤 마이크 권한 요청 중...");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            console.log("✅ 마이크 접근 성공");
            return stream;
        } catch (error) {
            console.error("🚫 마이크 접근 실패:", error);

            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                alert("🚨 마이크 사용이 허용되지 않았습니다. 브라우저 설정에서 변경해주세요.");
                
                // 크롬(Chrome) 설정 페이지 열기
                window.open("chrome://settings/content/microphone", "_blank");
            }
            return null;
        }
    };

    // 🔴 녹음 시작 함수
    const startRecording = async () => {
        try {
            const stream = await getAudioStream();
            if (!stream) return;

            const websocket = new WebSocket("ws://112.152.14.116:25210/ws/audio");
            websocketRef.current = websocket;

            websocket.onopen = () => {
                console.log("✅ WebSocket 연결 성공");
                setIsRecording(true);

                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;
                audioChunks.current = [];

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        if (websocket.readyState === WebSocket.OPEN) {
                            websocket.send(event.data);
                            console.log("📡 WebSocket으로 오디오 데이터 전송");
                        } else {
                            console.error("🚨 WebSocket이 닫혀 있음");
                        }
                    }
                };

                recorder.onstop = async () => {
                    console.log("🛑 녹음이 멈춤, 마지막 데이터 전송");
                    
                    if (audioChunks.current.length > 0) {
                        const blob = new Blob(audioChunks.current, { type: "audio/wav" });

                        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                            websocketRef.current.send(await blob.arrayBuffer());
                            console.log("📡 WebSocket으로 마지막 오디오 데이터 전송 완료");
                        }

                        const url = URL.createObjectURL(blob);
                        setAudioUrl(url);
                    }
                };

                recorder.start(1000);
                console.log("🎙 녹음 시작됨");
            };

            websocket.onclose = () => {
                console.log("🔌 WebSocket 연결 종료");
            };

            websocket.onerror = (error) => {
                console.error("⚠️ WebSocket 오류:", error);
                stopRecording();
            };
        } catch (error) {
            console.error("🚫 녹음 시작 중 오류:", error);
        }
    };

    // 🛑 녹음 중지 함수
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log("🛑 녹음 중지됨");
        }

        setTimeout(() => {
            if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                websocketRef.current.close();
                console.log("🔌 WebSocket 연결 종료");
            }
        }, 5000);

        setIsRecording(false);
    };

    return (
        <div className="p-6 flex flex-col items-center">
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
                    <AudioPlayer audioUrl={audioUrl} />
                    <TopicSwitcher onSwitch={setTopic} />
                </>
            )}
        </div>
    );
};

export default RecordingPage;
