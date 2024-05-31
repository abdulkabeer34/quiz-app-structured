import { Button } from 'antd';
import React, {  useState } from 'react';
import './style.scss';
import { useLogin , useQuizNotification} from '../../../../UseCases';



export const ContactList = ({ questions, confirmLoading }) => {
  const token = localStorage.getItem('token');
  const [buttonsLoading, setButtonsLoading] = useState([]);

  const { loginData: { data: contactList, isLoading }} = useLogin(onSuccess);
  const { sendNotificationMutation } = useQuizNotification(token);

  function onSuccess() {
    setButtonsLoading(Array(contactList.length).fill(false));
    console.log('hello world succes function in runing')
  }

  const sendNotification = async ({index})=>{
    // if(!onSuccess) return;
    if(isLoading) return;
    setButtonsLoading([...buttonsLoading.slice(0,index),true,...buttonsLoading.slice(index+1)])
    await  sendNotificationMutation.mutateAsync({ token, data:questions })
    setButtonsLoading([...buttonsLoading.slice(0,index),false,...buttonsLoading.slice(index+1)])

  }
  

  if (isLoading) return;
  return (
    <div className='contact-list-main'>
      <div className='center grid'>
        {contactList.map((item, index) => {
          if (token == item.id) return;
          return (
            <div className='contact flex align-center justify-between' key={index}>
              <div className='main-info flex'>
                <div className='image'>
                  <img
                    alt='person'
                    className='img'
                    loading='lazy'
                    src='https://ui.shadcn.com/avatars/03.png'
                  />
                </div>
                <div className='user-details'>
                  <p className=''>{item.username}</p>
                  <p>Student</p>
                </div>
              </div>
              <div className='send-button'>
                <Button
                  loading={buttonsLoading[index] || confirmLoading}
                  onClick={() =>
                   sendNotification({index,})
                  }
                >
                  Send
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
