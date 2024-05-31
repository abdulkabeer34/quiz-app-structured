import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';
import { Box, AntdInput } from './styled-components';
import { ContactList } from '../ContactList';
import { useLogin, useQuizNotification } from '../../../../UseCases';
import { AntdModal, CreateQuizConfigProvider, FloatingButtonAntd, basicInfo as basicInfo, useCreateQuizHandler } from '../../../../UseCases';

export const CreateQuiz = () => {
  const [questions, setQuestion] = useState({
    quiz: [],
    basicInfo,
    dataId: '',
  });

  useEffect(() => {
    document.title = "Create Quiz";
  }, [])
  


  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');

  const { addOpt, addQuiz, deleteOpt, updateOpt, updateQuiz, deleteData } =
    useCreateQuizHandler({ questions, setQuestion, messageApi });


  const {loginData:{data:contactList,isLoading}} = useLogin();
  const {sendNotificationsAllMutation } = useQuizNotification();


  if(isLoading) return;

  const sendALl = async () => {
    setConfirmLoading(true);
    await sendNotificationsAllMutation.mutateAsync({contactList,data:questions,token})
    setConfirmLoading(false);
    setOpen(false)
  };




  return (
    <div className='create-quiz-main'>
      <CreateQuizConfigProvider>
        <AntdModal
          message={
            <ContactList
              confirmLoading={confirmLoading}
              questions={questions}
            />
          }
          onOk={async () => await sendALl()}
          closeModal={()=>setOpen(false)}
          open={open}
          style={{ heigth: '80vw' }}
          header={
            <h1 style={{ fontSize: '15px', padding: '0 24px' }}>
              Send to someone
            </h1>
          }
          confirmLoading={confirmLoading}
          footerMessage={'Send All'}
        />
        <FloatingButtonAntd
          icon={PlusOutlined}
          tooltip={'Create Quiz'}
          callback={addQuiz}
          animation
          className='floating-icon'
        />
        {contextHolder}
        <div>
          <div className='quizez flex align-center flex-column'>
            <div  className='send-btn'>
              <Button
                type='primary'
                width={100}
                style={{
                  float: 'right',
                  display: questions.quiz.length === 0 && 'none',
                }}
                onClick={() => setOpen(true)}
              >
                Send It
              </Button>
            </div>
            {questions.quiz.length === 0 ? (
              <h1>No Question Added , Plz Add the Questions</h1>
            ) : (
              questions.quiz.map((item, index) => {
                const { question, shuffledAnswers } = item;
                return (
                  <div className='boxes' key={index}>
                    <Box className='box'>
                      <div className='center'>
                        <PlusOutlined
                          className='cross-icon border-rounded'
                          onClick={() => deleteData(index)}
                        />
                        <div className='center'>
                          <div className='question flex'>
                            <h2>Question:</h2>
                            <AntdInput
                              className='question-input'
                              placeholder='Enter the title of you question here'
                              type='text'
                              value={question}
                              onChange={(e) =>
                                 updateQuiz(e.target.value, index)
                              }
                            />
                            <Button
                              onClick={(e) => addOpt(index)}
                              type='primary'
                            >
                              Add Option
                            </Button>
                          </div>
                          <div className='options flex flex-column align-center'>
                            {shuffledAnswers.length != 0 ? (
                              shuffledAnswers.map((item, subIndex) => {
                                return (
                                  <div className='center-inner cursor-pointer text-center' key={subIndex}>
                                    <PlusOutlined
                                      className='cross-icon border-rounded cursor-pointer'
                                      onClick={() => deleteOpt(index, subIndex)}
                                    />
                                    <Input
                                      key={subIndex}
                                      className='option-inner'
                                      value={item}
                                      onChange={(e) =>
                                        updateOpt(
                                          index,
                                          subIndex,
                                          e.target.value
                                        )
                                      } 
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <h3>No Options Added</h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </CreateQuizConfigProvider>
    </div>
  );
};

