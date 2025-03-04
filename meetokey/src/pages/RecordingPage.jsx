import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/RecordingPage.css"; 

import RecordingModal from "../components/RecordingComponents/RecordingModal";
import Header from "../components/RecordingComponents/Header";
import Timer from "../components/RecordingComponents/Timer";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioModal from "../components/RecordingComponents/AudioModal";

// ✅ 이미지 추가 (경로 확인)
import soundwave from "../assets/imgs/soundwave.jpg"; 

const API_BASE_URL = "http://112.152.14.116:25114";  // ✅ 백엔드 API 주소
const WS_BASE_URL = "ws://112.152.14.116:25114/ws"; // ✅ 웹소켓 주소

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const [meetingName, setMeetingName] = useState("");
    const [topic, setTopic] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]); 
    const mediaStreamRef = useRef(null);
    const ws = useRef(null);

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

    useEffect(() => {
        initializeMediaStream();

        // ✅ WebSocket 연결
        ws.current = new WebSocket(WS_BASE_URL);
        ws.current.onopen = () => console.log("🔗 WebSocket 연결됨");
        ws.current.onmessage = (event) => console.log("📩 WebSocket 메시지:", event.data);
        ws.current.onerror = (error) => console.error("❌ WebSocket 오류:", error);
        ws.current.onclose = () => console.log("🔌 WebSocket 연결 종료됨");

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const initializeMediaStream = async () => {
        try {
            console.log("🎤 마이크 권한 요청 중...");
            const constraints = { audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaStreamRef.current = stream;
            console.log("✅ 마이크 접근 성공");
        } catch (error) {
            console.error("🚫 마이크 접근 실패:", error);
            alert("🚨 마이크 사용이 허용되지 않았습니다. 브라우저 설정을 확인하세요.");
        }
    };

    const startRecording = () => {
        try {
            if (!mediaStreamRef.current) {
                console.error("🚨 MediaStream이 존재하지 않습니다.");
                return;
            }
            setIsRecording(true);
            audioChunks.current = []; 
            const recorder = new MediaRecorder(mediaStreamRef.current);
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                console.log("🛑 녹음이 멈춤, 오디오 데이터 저장 중...");
                const blob = new Blob(audioChunks.current, { type: "audio/wav" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                setAudioBlob(blob);
                setShowAudioModal(true);

                // ✅ WebSocket으로 녹음 완료 메시지 전송
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({ event: "recording_stopped", meeting_name: meetingName, topic }));
                }

                // ✅ 백엔드에 회의 데이터 저장 요청
                await saveMeeting(blob);
            };

            recorder.start();
            console.log("🎙 녹음 시작됨");

            // ✅ WebSocket으로 녹음 시작 메시지 전송
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ event: "recording_started", meeting_name: meetingName, topic }));
            }
        } catch (error) {
            console.error("🚫 녹음 시작 중 오류:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log("🛑 녹음 중지됨");
            setIsRecording(false);
        }
    };

    const downloadRecording = () => {
        if (!audioBlob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(audioBlob);
        a.download = "recording.wav";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("📥 녹음 파일 다운로드 완료");
    };

    // ✅ 백엔드에 회의 데이터 저장
    const saveMeeting = async (audioBlob) => {
        const formData = new FormData();
        formData.append("meeting_name", meetingName);
        formData.append("meeting_date", new Date().toISOString());
        formData.append("audio_url", audioBlob);

        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("회의 데이터 저장 실패");
            }

            console.log("✅ 회의 데이터 저장 성공");
        } catch (error) {
            console.error("❌ 백엔드 API 요청 오류:", error);
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

                    {/* ✅ '대기중' 아래에 사운드웨이브 이미지 추가 */}
                    <div className="soundwave-container">
                        <img src={soundwave} alt="Sound Wave" className="soundwave-img" />
                    </div>

                    <RecordingControls 
                        isRecording={isRecording} 
                        startRecording={startRecording} 
                        stopRecording={stopRecording} 
                    />
                    <Timer seconds={seconds} />
                    <TopicSwitcher onSwitch={setTopic} />
                    <AudioModal 
                        isOpen={showAudioModal} 
                        onClose={() => setShowAudioModal(false)} 
                        audioUrl={audioUrl} 
                        onDownload={downloadRecording} 
                    />
                </>
            )}
        </div>
    );
};

export default RecordingPage;
