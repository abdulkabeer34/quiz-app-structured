import React from 'react';
import './style.scss';
import { Button } from 'antd';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { colorCodeGenerator, decodeHtmlEntities } from '../../../../UseCases';

export const MultipleChoice = ({ data, setSelectedAnswer }) => {
  const quizOptionLoading = useSelector((e) => e.quizStore.quizOptionLoading);

  if (!data) {
    return;
  }
  let { question, shuffledAnswers, selectedAnswer, corectAnswerIndex } = data;
  question = decodeHtmlEntities(question);
  return (
    <div className='multiple-choice-main'>
      <div className='question'>
        <h3>{question}</h3>
        <p>
          {selectedAnswer === 'undefined'
            ? '(Not Selected)'
            : setSelectedAnswer
            ? ''
            : selectedAnswer === corectAnswerIndex
            ? '(correct Answer)'
            : '(Incorrect Answer)'}
        </p>

        <div className='options  grid two-rows-column'>
          {shuffledAnswers.map((item, index) => {
            const { color, backgroundColor } = colorCodeGenerator(
              index,
              selectedAnswer,
              setSelectedAnswer,
              corectAnswerIndex
            );
            item = decodeHtmlEntities(item);
            return (
              <Button
                disabled={quizOptionLoading > 0 && quizOptionLoading < 4}
                loading={index === quizOptionLoading}
                key={index}
                style={{
                  color: color,
                  background: backgroundColor,
                  borderColor: color,
                }}
                onClick={() => setSelectedAnswer && setSelectedAnswer(index)}
                className='option1 cursor-pointer flex align-center justify-center text-center'
              >
                {index === selectedAnswer && setSelectedAnswer && (
                  <IoMdCheckmarkCircleOutline className='icon' />
                )}
                {item}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
