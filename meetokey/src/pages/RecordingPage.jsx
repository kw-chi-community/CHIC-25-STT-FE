import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import "../styles/RecordingPage.css"; // ✅ CSS 파일 import 추가
=======

import { useNavigate } from 'react-router-dom';
>>>>>>> main

import RecordingModal from "../components/RecordingComponents/Modal";
import Header from "../components/RecordingComponents/Header";
import Timer from "../components/RecordingComponents/Timer";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioPlayer from "../components/RecordingComponents/AudioPlayer";

<<<<<<< HEAD
=======
import { useLocation } from 'react-router-dom';
>>>>>>> main



const RecordingPage = () => {
<<<<<<< HEAD
=======
    const navigate = useNavigate();
>>>>>>> main
    const [isRecording, setIsRecording] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [meetingName, setMeetingName] = useState("");
    const [topic, setTopic] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const websocketRef = useRef(null);
    const audioChunks = useRef([]);

<<<<<<< HEAD
    // 타이머 관리
    useEffect(() => {
=======

    // 타이머 관리
    useEffect(() => {
        //JWT 토큰
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/"); // 토큰이 없으면 홈(/)으로 리디렉트
        }
        
>>>>>>> main
        let interval;
        if (isRecording) {
            interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
            clearInterval(interval);
            setSeconds(0);
        }
        return () => clearInterval(interval);
<<<<<<< HEAD
    }, [isRecording]);

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

            const websocket = new WebSocket("ws://localhost:8000/ws/audio");
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

=======
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

        // ❌ 마이크 차단되었을 경우 설정 페이지 자동으로 열기
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
            alert("🚨 마이크 사용이 허용되지 않았습니다. 브라우저 설정에서 변경해주세요.");
            
            // 크롬(Chrome) 설정 페이지 열기
            window.open("chrome://settings/content/microphone", "_blank");

            // 엣지(Edge) 설정 페이지 열기
            // window.open("edge://settings/content/microphone", "_blank");
        }
        return null;
    }
};

// 🚨 모달이 닫히면 자동으로 마이크 권한 요청 실행
const observeModalClose = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    if (!modal) {
        console.warn("🚨 모달을 찾을 수 없습니다.");
        return;
    }

    // MutationObserver: DOM 변화를 감지하는 기능
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.removedNodes.length > 0) {
                console.log("❌ 모달이 닫힘 → 마이크 권한 요청 실행!");
                
                // 🚨 마이크 권한 강제 요청
                getAudioStream();

                // 감지 종료
                observer.disconnect();
            }
        });
    });

    // 부모 노드 감지하여 변경 추적
    observer.observe(modal.parentNode, { childList: true });
};

// 🌟 페이지 로드 후 모달 감지 시작 (모달 닫힐 때 마이크 요청)
window.onload = () => {
    observeModalClose("#myModal"); // 모달 ID를 넣으면 됨 (예: #loginModal)
};

   // 🔴 녹음 시작 함수
const startRecording = async () => {
    try {
        const stream = await getAudioStream();
        if (!stream) return;

        // 🔌 WebSocket 연결
        const websocket = new WebSocket("ws://112.152.14.116:25210/ws/audio");
        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log("✅ WebSocket 연결 성공");
            setIsRecording(true);

            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunks.current = [];

            // 🎯 **데이터가 생성될 때마다 즉시 WebSocket으로 전송**
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

            // 녹음이 완전히 멈춘 후 오디오 데이터 저장
            recorder.onstop = async () => {
                console.log("🛑 녹음이 멈춤, 마지막 데이터 전송");
                
                if (audioChunks.current.length > 0) {
                    const blob = new Blob(audioChunks.current, { type: "audio/wav" });
            
                    // **남은 데이터 WebSocket으로 전송**
                    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                        websocketRef.current.send(await blob.arrayBuffer());
                        console.log("📡 WebSocket으로 마지막 오디오 데이터 전송 완료");
                    }
            
                    // 브라우저에서 재생할 URL 생성
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                }
            };
            
            // 🎯 **timeslice 없이 녹음 시작 → ondataavailable이 즉시 실행됨**
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

    // ⏳ **WebSocket을 2초 후 닫기 (남은 데이터 전송 후)**
    setTimeout(() => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.close();
            console.log("🔌 WebSocket 연결 종료");
        }
    }, 5000); // **2초 대기 후 WebSocket 닫기**
    
    setIsRecording(false);

        console.log("🛑 녹음 중지");
    };
    
    
>>>>>>> main
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

<<<<<<< HEAD
export default RecordingPage;
=======
export default RecordingPage;
>>>>>>> main
