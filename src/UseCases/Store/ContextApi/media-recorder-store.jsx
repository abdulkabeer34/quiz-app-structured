import React, { createContext, useState } from 'react';
import { useMediaRecorder } from '../../Hooks';
export const QuizAreaContext = createContext();

let interval;

export const ContextProvider = ({ children }) => {
  const [recorder, setRecorder] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [screenRecording, setScreenRecordedVideo] = useState(null);

  let [audioStream, setAudioStream] = useState(null);
  let [videoStream, setVideoStream] = useState(null);
  
  const recordingProps = useMediaRecorder({
    recorder,
    setRecorder,
    setScreenRecordedVideo,
    setRecordedVideo,
    audioStream,
    videoStream,
    setAudioStream,
    setVideoStream,
  });

  const startInterval = ({ callback, props, delay }) => {
    interval = setInterval(() => callback(props), delay);
  };

  const stopInterval = () => {
    clearInterval(interval);
    interval = null;
  };

  return (
    <QuizAreaContext.Provider
      value={{
        startInterval,
        stopInterval,
        screenRecording,
        setScreenRecordedVideo,
        recorder,
        setRecorder,
        recordedVideo,
        setRecordedVideo,
        ...recordingProps,
      }}
    >
      {children}
    </QuizAreaContext.Provider>
  );
};
