import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, message ,Spin} from 'antd';
import { AntdCascader, CustomModalAntd, FormItem } from './styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.scss';
import { setData, CATEGORIES_DATASET, DIFFICULTY_DATASET, TYPE_DATASET, useHandleFormSubmit, CreateQuizConfigProvider } from '../../../UseCases';

export const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const {mutation} = useHandleFormSubmit()

  const warning = ({ content }) => {
    messageApi.open({
      type: 'warning',
      content,
    });
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true)
    const props = await  mutation.mutateAsync({formData,userId: token});
    setLoading(false)

    if (!props) {
      warning({
        content:
          'interval server error , try selecting different options instead',
      });
      return;
    }
    const { quizData, dataId } = props;
    dispatch(setData(quizData));
    navigate(`/quiz-area/${dataId}/0`);
  };


  
  useEffect(() => {
    document.title = "Home";
  }, [])
  

  return (
    
    <div className='home-main flex align-center flex-column text-center'>
      {contextHolder}
      <CreateQuizConfigProvider >
        <div className='center  flex align-center flex-column'>
          <h1 className='main-heading'>My Quiz App</h1>
          <p className='main-details'>
            Embark on a journey of discovery through captivating quizzes
            tailored to your interests.
          </p>
          <button
            className='button-50 text-white  cursor-pointer text-center'
            role='button'
            onClick={() => setOpen(true)}
          >
            Take a Quiz
          </button>
        </div>
        <CustomModalAntd
          centered
          footer={false}
          open={open}
          onCancel={() => !loading && setOpen(false)}
          width={500}
        >
          <h1>Enter the Quiz data</h1>
        <Spin spinning={loading}>
        <Form
          layout='vertical'
          
            onFinish={(e) => handleFormSubmit(e)}
            initialValues={{
              amount: 3,
              category: 'any',
              difficulty: 'any',
              type: 'any',
            }}
          >
            <div className='form-items'>
              <FormItem className='form-item' width='50%'>
                <Form.Item label='Number of Questions:'    name='amount'>
                  <InputNumber min={1} max={50} />
                </Form.Item>
              </FormItem>
              <FormItem width='40%'>
                <Form.Item label='Select Category:' name='category'>
                  <AntdCascader options={CATEGORIES_DATASET} />
                </Form.Item>
              </FormItem>

              <FormItem width='50%'>
                <Form.Item label='Select Difficulty:' name='difficulty'>
                  <AntdCascader options={DIFFICULTY_DATASET} />
                </Form.Item>
              </FormItem>
              <FormItem width='40%'>
                <Form.Item label='Select Type:' name='type'>
                  <AntdCascader options={TYPE_DATASET} />
                </Form.Item>
              </FormItem>
            </div>
            <Button  className='submit-btn text-white' htmlType='submit'>
              Start The Quiz
            </Button>
          </Form>
        </Spin>
        </CustomModalAntd>
      </CreateQuizConfigProvider>
    </div>
  );
};
