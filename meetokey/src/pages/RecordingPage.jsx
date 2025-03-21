import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; 
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import Timer from "../components/RecordingComponents/Timer";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioModal from "../components/RecordingComponents/AudioModal";

const RecordingPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]); 
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
            clearInterval(interval);
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const initializeMediaStream = async () => {
        try {
            const constraints = { audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaStreamRef.current = stream;
        } catch (error) {
            alert("🚨 마이크 사용이 허용되지 않았습니다.");
        }
    };

    useEffect(() => {
        initializeMediaStream();
    }, []);

    const startRecording = () => {
        if (!mediaStreamRef.current) return;
        setIsRecording(true);
        audioChunks.current = [];
        const recorder = new MediaRecorder(mediaStreamRef.current);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        recorder.onstop = () => {
            const blob = new Blob(audioChunks.current, { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setAudioBlob(blob);
            setShowAudioModal(true);
        };

        recorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="recording-page">
            <RecordingStatus isRecording={isRecording} />

            {/* 🎵 사운드 웨이브 박스 */}
            <div className="soundwave-box">
                <div className="soundwave-container">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className={`wave-bar ${isRecording ? "animate" : ""}`}></div>
                    ))}
                </div>
            </div>

            <RecordingControls isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
            <Timer seconds={seconds} />
            <AudioModal isOpen={showAudioModal} onClose={() => setShowAudioModal(false)} audioUrl={audioUrl} />
        </div>
    );
};

export default RecordingPage;
