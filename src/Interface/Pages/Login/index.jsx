import React, { useState } from "react";
import "./style.scss";
import { Checkbox, ConfigProvider, Form, notification } from "antd";
import {
  LoginMain,
  Left,
  Right,
  AntdInput,
  AntdPasswordInput,
  AntdForm,
  AntdButton,
  AntdLoginTheme,
} from "./StyledComponents";
import { useFormik } from "formik";
import { SignupAuth ,signupSchema ,LoginAuth} from "../../../UseCases";

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
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await handleSubmitForm(values);
    }
  });


  
  const changePage = () => {
    setIsLogin(!isLogin);
    form.resetFields();
    resetForm();
  };



  return (
    <>
      {contextHolder}
      <ConfigProvider theme={AntdLoginTheme}>
        <LoginMain className="login-main">
          <Left className="left">
            <img
              src={require("../../../Ui_FrameWork/Assets/Images/illustration.svg").default}
              alt="Illustration"
            />
          </Left>
          <Right className="right">
            <AntdForm className="center" form={form} onFinish={handleSubmit}>
              <div className="image">
                <img src={require("../../../Ui_FrameWork/Assets/Images/pngwing.com (5).png")} alt="Logo" />
              </div>
              <div className="heading">
                <h1>Welcome</h1>
                <p>Please {isLogin ? "Login" : "Signup"} to continue</p>
              </div>
              <div className="form-item">
                <p>Username</p>
                <AntdInput
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="false"
                  placeholder="Enter the username"
                />
                {touched.username && errors.username ? (
                  <div className="error">{errors.username}</div>
                ) : null}
              </div>
              <div className="password">
                <p>Password</p>
                <AntdPasswordInput
                  autoComplete = "false"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the password"
                />
                {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <AntdButton loading={loading} htmlType="submit">
                {isLogin ? "Login" : "Signup"}
              </AntdButton>
              <div className="form-bottom-1">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="remember-me"
                >
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
                <p>Forget Password?</p>
              </div>
              <div className="sign-login">
                {isLogin ? (
                  <>
                    Don't have an account?
                    <span onClick={changePage}>Signup</span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span onClick={changePage}>Login</span>
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
