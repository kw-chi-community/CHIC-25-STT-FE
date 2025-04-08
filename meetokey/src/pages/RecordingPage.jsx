import React, { useState, useEffect, useRef } from "react";
import "../styles/RecordingPage.css"; 
import Timer from "../components/RecordingComponents/Timer";
//import AudioModal from "../components/RecordingComponents/AudioModal";
import TopicSwitcher from "../components/RecordingComponents/TopicSwitcher";
import RecordingControls from "../components/RecordingComponents/RecordingControls";
import RecordingStatus from "../components/RecordingComponents/RecordingStatus";
import AudioModal from "../components/RecordingComponents/AudioModal";

// ✅ 이미지 추가 (경로 확인)
import soundwave from "../assets/imgs/soundwave.jpg"; 

const API_BASE_URL = "http://112.152.14.116:25114";  // ✅ 백엔드 API 주소
const WS_BASE_URL = "ws://112.152.14.116:25114/ws"; // ✅ 웹소켓 주소

const RecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [topic, setTopic] = useState("회의 주제를 입력해주세요 ✍️");
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [topics, setTopics] = useState([{ name: "회의 주제를 입력해주세요 ✍️", time: 0 }]);
  const [showInitModal, setShowInitModal] = useState(true);
  const [meetingName, setMeetingName] = useState("");
  const navigate = useNavigate(); 
  const [showStopConfirmModal, setShowStopConfirmModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);




  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

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

  useEffect(() => {
    const initializeMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      } catch (error) {
        alert("🚨 마이크 사용이 허용되지 않았습니다.");
      }
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

       {/* 
<AudioModal
  isOpen={showAudioModal}
  onClose={() => setShowAudioModal(false)}
  audioUrl={audioUrl}
/> 
*/}


<button
  className="floating-note-btn"
  onClick={() => navigate("/date")}
>
  📑 회의록 보기
</button>


      {/* ⏹ 멈추기 모달 */}
{showStopConfirmModal && (
  <div className="confirm-modal-overlay">
    <div className="confirm-modal">
      <p>정말 녹음을 멈출까요?</p>
      <div className="modal-buttons">
        <button
          className="btn-confirm"
          onClick={() => {
            stopRecording();
            setShowStopConfirmModal(false);
          }}
        >
          네
        </button>
        <button className="btn-cancel" onClick={() => setShowStopConfirmModal(false)}>
          아니오
        </button>
      </div>
    </div>
  </div>
)}

{/* 🔁 다시 녹음 모달 */}
{showResetConfirmModal && (
  <div className="confirm-modal-overlay">
    <div className="confirm-modal">
      <p>현재까지의 녹음을 삭제하고<br />다시 시작할까요?</p>
      <div className="modal-buttons">
        <button
          className="btn-confirm"
          onClick={() => {
            stopRecording();
            setAudioUrl(null);
            setAudioBlob(null);
            setSeconds(0);
            setTopics([{ name: topic, time: 0 }]);
            setShowResetConfirmModal(false);
          }}
        >
          네
        </button>
        <button className="btn-cancel" onClick={() => setShowResetConfirmModal(false)}>
          아니오
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default RecordingPage;