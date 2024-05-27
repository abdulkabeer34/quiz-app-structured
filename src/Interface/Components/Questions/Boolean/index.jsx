import React from 'react';
import './style.scss';
import { ConfigProvider, Radio } from 'antd';
import { decodeHtmlEntities } from '../../../../UseCases';
import { AntdRadio } from './styled-components';

export const Boolean = ({ data, setSelectedAnswer }) => {
  if (!data) return null;


  let { question, selectedAnswer ,correctAnswer, incorrectAnswers} = data;
  question = decodeHtmlEntities(question);

  return (
    <div className='boolean-main'>
      <div className='question'>
        <h3>{question}</h3>
        <div className='options grid two-rows-column'>
          <Radio.Group
            className='radio-group'
            value={selectedAnswer}
            onChange={(e) =>
              setSelectedAnswer && setSelectedAnswer(e.target.value)
            }
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'black',
                },
              }}
            >
              <AntdRadio value={0}>
                <h3> True</h3>
              </AntdRadio>
              <AntdRadio value={1}>
                <h3>False</h3>
              </AntdRadio>
            </ConfigProvider>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};
