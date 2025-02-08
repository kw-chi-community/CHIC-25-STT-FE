import React, { useState, useRef } from "react";
//useState: 렌더링 됨 (변경 감지됨. ex. 녹음 중인지) useRef: 렌더링 안 됨 (그냥 값 저장용) ex. mediaRecoderRef, websocketRef 등등

const RecordingPage = () => { //리액트 컴포넌트 선언언
    const [isRecording, setIsRecording] = useState(false); //녹음 중이면 상태 true, 아니면 false
    const mediaRecorderRef = useRef(null); //녹음 도구를 저장하는 변수
    const websocketRef = useRef(null); //서버와 연결하는 변수 

    const startRecording = async () => { //이 함수가 실행되면 마이크를 사용해서 녹음을 시작하고, 서버로 전송
        try {
          
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            //사용자에게 마이크를 사용할 지 물어보고,  허용하면 stream을 가져옴. stream에 마이크에서 입력된 오디오 데이터가 들어옴. await를 사용하여 마이크가 허용될 때까지 기다림.

            // WebSocket 연결
            const websocket = new WebSocket("ws://localhost:8000/ws/audio");
            websocketRef.current = websocket;
            //서버와의 연결을 생성
            //websocketRef.current에 저장하여 나중에 연결을 끊을 수 있도록

            websocket.onopen = () => {
                console.log("WebSocket connection established.");
                // MediaRecorder 초기화
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                // 녹음 데이터가 생성될 때마다 WebSocket으로 전송
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && websocket.readyState === WebSocket.OPEN) {
                        websocket.send(event.data);
                    }
                };

                // 녹음 시작
                mediaRecorder.start(200);
                setIsRecording(true);
            };

            websocket.onclose = () => {
                console.log("WebSocket connection closed.");
                stopRecording();
            };

            websocket.onerror = (error) => {
                console.error("WebSocket error:", error);
                stopRecording();
            };
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }

        if (websocketRef.current) {
            websocketRef.current.close();
        }

        setIsRecording(false);
    };

    return (
        <div>
            <h1>🎤 Recording Page</h1>
            <p>이곳에서 음성을 녹음하고 WebSocket을 통해 데이터를 전송할 수 있습니다.</p>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
        </div>
    );
};

export default RecordingPage;
