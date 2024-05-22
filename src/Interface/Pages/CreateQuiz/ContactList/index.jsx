import { Button } from "antd";
import React, {  useState } from "react";
import "./style.scss";
import { useLoginQuery , useQuizNotificationQuery} from "../../../../UseCases";



export const ContactList = ({ questions, confirmLoading }) => {
  const token = localStorage.getItem("token");
  const [buttonsLoading, setButtonsLoading] = useState([]);

  const { loginData: { data: contactList, isLoading }} = useLoginQuery(onSuccess);
  const { sendNotificationMutation } = useQuizNotificationQuery(token);

  function onSuccess() {
    setButtonsLoading(Array(contactList.length).fill(false));
  }

  const sendNotification = async ({index})=>{
    setButtonsLoading([...buttonsLoading.slice(0,index),true,...buttonsLoading.slice(index+1)])
    await  sendNotificationMutation.mutateAsync({ token, data:questions })
    setButtonsLoading([...buttonsLoading.slice(0,index),false,...buttonsLoading.slice(index+1)])

  }
  

  if (isLoading) return;
  return (
    <div className="contact-list-main">
      <div className="center">
        {contactList.map((item, index) => {
          if (token == item.id) return;
          return (
            <div className="contact" key={index}>
              <div className="main-info">
                <div className="image">
                  <img
                    style={{ width: "2.25rem" }}
                    src="https://ui.shadcn.com/avatars/03.png"
                  />
                </div>
                <div className="user-details">
                  <p>{item.username}</p>
                  <p>Student</p>
                </div>
              </div>
              <div className="send-button">
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
