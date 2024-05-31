import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { Boolean, MultipleChoice } from '../../Components';
import { ConfigProvider } from 'antd';
import { useQuizHistory, QuizAreaContext } from '../../../UseCases';


export const QuizResult = () => {
  const { id: dataId } = useParams();
  const [result, setResult] = useState(null);
  let { queryData } = useQuizHistory();
  let { data,  isLoading } = queryData;
  const { recordedVideo, screenRecording } = useContext(QuizAreaContext);

  useEffect(() => {
    if (isLoading) return;
    const currentQuiz = data.find((item) => item.dataId === dataId);
    setResult(currentQuiz);
  }, [data]);


  
  useEffect(() => {
    document.title = "Quiz Result";
  }, [])
  

  if (!result) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  return (
    <div className='quiz-result-main'>
      <ConfigProvider theme={{ token: { colorPrimary: 'black' } }}>
        <div className='upper-area flex align-center justify-between'>
          <h2>Your Quiz Result:</h2>
        </div>
        {result.quiz.map((item, index) => {
          const { type } = item;

          return (
            <div  className='result-quest' key={index}>
              <h3>Question {index + 1}.</h3>
              {type === 'boolean' ? (
                <Boolean key={index} data={item} setSelectedAnswer={false} />
              ) : (
                <MultipleChoice
                  key={index}
                  data={item}
                  setSelectedAnswer={false}
                />
              )}
            </div>
          );
        })}
        {recordedVideo && (
          <video
          preload='none'
            className='recorded-video'
            src={recordedVideo}
            controls
          ></video>
        )}
        {screenRecording && (
          <video
          preload='none'
            className='recorded-video'
            src={screenRecording}
            controls
          ></video>
        )}
      </ConfigProvider>
    </div>
  );
};
