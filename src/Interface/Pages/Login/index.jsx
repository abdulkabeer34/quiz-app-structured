import React, { useEffect, useState } from 'react';
import './style.scss';
import { Checkbox, ConfigProvider, Form, notification } from 'antd';
import {
  LoginMain,
  Left,
  Right,
  AntdInput,
  AntdPasswordInput,
  AntdForm,
  AntdButton,
  AntdLoginTheme,
} from './styled-components';
import { useFormik } from 'formik';
import { SignupAuth ,SIGNUP_SCHEMA ,LoginAuth} from '../../../UseCases';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();


  const handleSubmitForm = async (data) => {
    setLoading(true);

    try {
      if (isLogin) await LoginAuth(data,api);
      else await SignupAuth(data,api);
    } catch (error) {
      console.log(error);
      api.error({
        message: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }

  };

  const {values,handleChange,handleSubmit,resetForm ,handleBlur,errors,touched} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: SIGNUP_SCHEMA,
    onSubmit: async (values) => {
      await handleSubmitForm(values);
    }
  });


  
  const changePage = () => {
    setIsLogin(!isLogin);
    form.resetFields();
    resetForm();
  };


  
  useEffect(() => {
    document.title = "Login";
  }, [])
  


  return (
    <>
      {contextHolder}
      <ConfigProvider theme={AntdLoginTheme}>
        <LoginMain className='login-main flex'>
          <Left className='left flex align-center justify-center'>
            <img
            loading='lazy'
              src={require('../../../Ui_FrameWork/Assets/Images/illustration.svg').default}
              alt='Illustration'
            />
          </Left>
          <Right className='right flex align-center justify-center flex-column'>
            <AntdForm layout='vertical' className='center flex flex-column' form={form} onFinish={handleSubmit}>
              <div className='image'>
                <img loading='lazy'  src={require('../../../Ui_FrameWork/Assets/Images/pngwing.com (5).png')} alt='Logo' />
              </div>
              <div className='heading'>
                <h1>Welcome</h1>
                <p>Please {isLogin ? 'Login' : 'Signup'} to continue</p>
              </div>
              <Form.Item label="Username" className='form-item'>
                {/* <p>Username</p> */}
                <AntdInput
                  name='username'
                  
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='false'
                  placeholder='Enter the username'
                />
                {touched.username && errors.username ? (
                  <div className='error'>{errors.username}</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Password" className='password form-item'>
                {/* <p>Password</p> */}
                <AntdPasswordInput
                  autoComplete = 'false'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter the password'
                />
                {touched.password && errors.password ? (
                  <div className='error'>{errors.password}</div>
                ) : null}
              </Form.Item>
              <AntdButton loading={loading} htmlType='submit'>
                {isLogin ? 'Login' : 'Signup'}
              </AntdButton>
              <div className='form-bottom-1 flex align-center justify-between'>
                <Form.Item
                  name='remember'
                  valuePropName='checked'
                  className='remember-me'
                >
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
                <p className='text-underline'>Forget Password?</p>
              </div>
              <div className='sign-login flex align-center justify-center'>
                {isLogin ? (
                  <>
                    Don't have an account?
                    <span className='cursor-pointer text-underline' onClick={changePage}>Signup</span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span className='cursor-pointer' onClick={changePage}>Login</span>
                  </>
                )}
              </div>
            </AntdForm>
          </Right>
        </LoginMain>
      </ConfigProvider>
    </>
  );
};
