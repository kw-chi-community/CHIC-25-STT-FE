import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; // ✅ CSS 파일 import 추가

import { useNavigate } from 'react-router-dom';

import RecordingModal from "../components/RecordingComponents/Modal";
import Header from "../components/RecordingComponents/Header";
import Timer from "../components/RecordingComponents/Timer";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioPlayer from "../components/RecordingComponents/AudioPlayer";

import { useLocation } from 'react-router-dom';



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


    // 타이머 관리
    useEffect(() => {
        //JWT 토큰
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/"); // 토큰이 없으면 홈(/)으로 리디렉트
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

    // 오디오 스트림 가져오기
    const getAudioStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("✅ 마이크 접근 성공");
            return stream;
        } catch (error) {
            console.error("🚫 마이크 접근 실패:", error);
            alert("마이크 사용이 허용되지 않았습니다.");
            return null;
        }
    };

    // 녹음 시작
    const startRecording = async () => {
        try {
            const stream = await getAudioStream();
            if (!stream) return;

            const websocket = new WebSocket("http://112.152.14.116:25210/ws/audio");
            websocketRef.current = websocket;

            websocket.onopen = () => {
                console.log("✅ WebSocket 연결 성공");
                setIsRecording(true);

                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;
                audioChunks.current = [];

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.current.push(event.data);
                        if (websocket.readyState === WebSocket.OPEN) {
                            websocket.send(event.data);
                        }
                    }
                };

                recorder.onstop = () => {
                    const blob = new Blob(audioChunks.current, { type: "audio/wav" });
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                };

                recorder.start();
                console.log("🎙 녹음 시작됨");
            };

            websocket.onclose = () => {
                console.log("🔌 WebSocket 연결 종료");
                stopRecording();
            };

            websocket.onerror = (error) => {
                console.error("⚠️ WebSocket 오류:", error);
                stopRecording();
            };
        } catch (error) {
            console.error("🚫 녹음 시작 중 오류:", error);
        }
    };

    // 녹음 중지
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (websocketRef.current) {
            websocketRef.current.close();
        }
        setIsRecording(false);
        console.log("🛑 녹음 중지");
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
