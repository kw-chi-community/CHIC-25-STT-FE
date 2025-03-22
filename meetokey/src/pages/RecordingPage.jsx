import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; 
import Timer from "../components/RecordingComponents/Timer";
import AudioModal from "../components/RecordingComponents/AudioModal";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import backgroundImage from "../assets/imgs/slider_bg01.jpg";

const RecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [topic, setTopic] = useState("회의 주제를 입력해주세요 ✍️");
  const [showTopicInput, setShowTopicInput] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const mediaStreamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const handleTopicSwitch = (newTopic) => {
    setTopic(newTopic);
    setShowTopicInput(false); // 입력창 닫기
  };

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

  useEffect(() => {
    const initializeMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      } catch (error) {
        alert("🚨 마이크 사용이 허용되지 않았습니다.");
      }
    };
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
      ctx.strokeStyle = "#ffffff99";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = canvas.height / 2 + (v - 1) * (canvas.height / 6);
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
        cancelAnimationFrame(animationRef.current);
        audioContextRef.current?.close();
      };

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
      {/* 🔝 상단 바 */}
      <div className="top-bar">
  <button className="nav-btn">{"< 돌아가기"}</button>

  <div className="recording-actions">
    <button
      className={`action-btn ${isRecording ? "stop" : ""}`}
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? "⏹ 멈추기" : "🎤 시작"}
    </button>

    <button
      className="action-btn"
      onClick={() => {
        stopRecording(); // 녹음 중이라면 멈추고
        setAudioUrl(null); // 오디오 URL 초기화
        setAudioBlob(null); // Blob 초기화
        setSeconds(0); // 타이머 초기화
      }}
    >
      🔁 다시 녹음
    </button>
  </div>
</div>



      <Timer seconds={seconds} />

      {/* 📝 회의 주제 */}
      <h2 className="topic-title">📝 {topic}</h2>

      {/* 이미지 + 웨이브 */}
      <div className="image-wrapper">
        <canvas ref={canvasRef} className="waveform-canvas"></canvas>
        <img src={backgroundImage} alt="배경" className="main-image" />
      </div>

      {/* 안내 문구 */}
      <p className="auto-save-message">💾 오늘의 회의는 자동 저장됩니다</p>

      {/* 모달 또는 오디오 결과 */}
      <AudioModal
        isOpen={showAudioModal}
        onClose={() => setShowAudioModal(false)}
        audioUrl={audioUrl}
      />

      {/* 🧷 하단 주제 플로팅 버튼 */}
      <button
        className="floating-topic-btn"
        onClick={() => setShowTopicInput((prev) => !prev)}
        title="주제 변경"
      >
        ➕
      </button>

      {showTopicInput && (
        <div className="floating-topic-box">
          <TopicSwitcher onSwitch={handleTopicSwitch} />
        </div>
      )}
    </div>
  );
};

export default RecordingPage;
