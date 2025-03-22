import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; 
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import Timer from "../components/RecordingComponents/Timer";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioModal from "../components/RecordingComponents/AudioModal";
import backgroundImage from "../assets/imgs/slider_bg01.jpg";

const RecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const mediaStreamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
    } catch (error) {
      alert("🚨 마이크 사용이 허용되지 않았습니다.");
    }
  };

  useEffect(() => {
    initializeMediaStream();
  }, []);

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const bufferLength = analyserRef.current.fftSize;
    const dataArray = new Uint8Array(bufferLength);
  
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff99"; // 더 연하게
  
      ctx.beginPath();
  
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
  
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = canvas.height / 2 + (v - 1) * (canvas.height / 6); // 더 부드럽게
  
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
  
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
  
    draw();
  };
  
  const startRecording = () => {
    if (!mediaStreamRef.current) return;

    setIsRecording(true);
    audioChunks.current = [];

    try {
      const recorder = new MediaRecorder(mediaStreamRef.current);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioBlob(blob);
        setShowAudioModal(true);

        // 정지 시 애니메이션도 멈추기
        cancelAnimationFrame(animationRef.current);
        audioContextRef.current?.close();
      };

      // 🎧 오디오 시각화 설정
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      source.connect(analyser);

      drawWaveform();
      recorder.start();
    } catch (error) {
      console.error("녹음 시작 중 오류 발생:", error);
      alert("❌ MediaRecorder 시작 실패: 브라우저 호환성 또는 스트림 문제일 수 있어요.");
      setIsRecording(false);
    }
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

      <div className="image-wrapper">
        {/* ✅ 캔버스: 이미지 위 웨이브 */}
        <canvas ref={canvasRef} className="waveform-canvas"></canvas>

        {/* ✅ 이미지 박스: 둥글게 ❌ */}
        <img src={backgroundImage} alt="배경" className="main-image" />
      </div>

      <RecordingControls
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      <Timer seconds={seconds} />
      <AudioModal
        isOpen={showAudioModal}
        onClose={() => setShowAudioModal(false)}
        audioUrl={audioUrl}
      />
    </div>
  );
};

export default RecordingPage;
