import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; 
import Timer from "../components/RecordingComponents/Timer";
import AudioModal from "../components/RecordingComponents/AudioModal";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import TopicTimeline from "../components/RecordingComponents/TopicTimeline";
import backgroundImage from "../assets/imgs/slider_bg01.jpg";
import Header from "../components/landingComponents/Header";
import RecordingModal from "../components/RecordingComponents/RecordingModal";


const RecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [topic, setTopic] = useState("회의 주제를 입력해주세요 ✍️");
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [topics, setTopics] = useState([{ name: "회의 주제를 입력해주세요 ✍️", time: 0 }]);
  const [showInitModal, setShowInitModal] = useState(true); // 초기 모달 상태
  const [meetingName, setMeetingName] = useState("");        // 회의명 저장
  // 파일 맨 위 useState 아래에 추가
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;


  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const mediaStreamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const handleStartMeeting = (name, firstTopic) => {
    setMeetingName(name);
    setTopic(firstTopic);
    setTopics([{ name: firstTopic, time: 0 }]);
    setShowInitModal(false); // 모달 닫기
  };
  

  const handleTopicSwitch = (newTopic) => {
    setTopic(newTopic);
    setTopics((prev) => [...prev, { name: newTopic, time: seconds }]);
    setShowTopicInput(false);
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
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
    <>
    <Header />
  
    <div className="recording-page">
      <RecordingModal
        isOpen={showInitModal}
        onClose={() => setShowInitModal(false)}
        onStart={handleStartMeeting}
      />
  
      {/* 문서형 전체 박스 */}
      <div className="recording-document">
     <h1 className="document-title">{formattedDate}의 회의록</h1>
  
        {/* 회의 정보 테이블 */}
        <div className="recording-table">
          <div className="table-row">
            <div className="table-cell label">회의명</div>
            <div className="table-cell">{meetingName}</div>
            <div className="table-cell label">주제</div>
            <div className="table-cell">{topic}</div>
          </div>
          <div className="table-row">
            <div className="table-cell label">진행 시간</div>
            <div className="table-cell"><Timer seconds={seconds} /></div>
            <div className="table-cell label">조작</div>
            <div className="table-cell">
              <button
                className={`action-btn ${isRecording ? "stop" : ""}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? "⏹ 멈추기" : "🎤 시작"}
              </button>
              <button
                className="action-btn"
                onClick={() => {
                  stopRecording();
                  setAudioUrl(null);
                  setAudioBlob(null);
                  setSeconds(0);
                  setTopics([{ name: topic, time: 0 }]);
                }}
              >
                🔁 다시 녹음
              </button>
            </div>
          </div>
        </div>
  
        {/* 웨이브 + 이미지 */}
        <div className="image-wrapper">
          <canvas ref={canvasRef} className="waveform-canvas"></canvas>
          <img src={backgroundImage} alt="배경" className="main-image" />
        </div>
  
        {/* 타임라인 */}
        <TopicTimeline topics={topics} currentTime={seconds} />
  
        {/* 하단 문구 */}
        <p className="auto-save-message">💾 AI가 오늘의 회의를 정리해줍니다.</p>
      </div>
  
      {/* 오디오 모달 */}
      <AudioModal
        isOpen={showAudioModal}
        onClose={() => setShowAudioModal(false)}
        audioUrl={audioUrl}
      />
  
      {/* 주제 변경 버튼 */}
      <button
        className="floating-topic-btn"
        onClick={() => setShowTopicInput((prev) => !prev)}
        title="주제 변경"
      >
        ➕
      </button>
  
      {/* 주제 입력 박스 */}
      {showTopicInput && (
        <div className="floating-topic-box">
          <TopicSwitcher onSwitch={handleTopicSwitch} />
        </div>
      )}
    </div>
  </>
  
  );
  
};

export default RecordingPage;
