import React, { useEffect } from 'react';
import './style.scss';
import { Dropdown, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline, IoEllipsisHorizontal } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useQuizNotification } from '../../../UseCases';
import { FullWidthSkeletonInput } from './styled-components';


export const Notifications = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const { queryData, updateNotificationMutation } = useQuizNotification(token);
  const { data, isLoading } = queryData;

  const removeItem = async (index, dataId) => {
    const newData = data.data.filter((item, subIndex) => index !== subIndex);
    updateNotificationMutation.mutate(newData);
  };

  const markAsReadorUnread = async (index, expression) => {
    const newData = data.data.map((item, subIndex) => {
      if (subIndex === index) {
        item.read = expression;
      }
      return item;
    });
    updateNotificationMutation.mutate(newData);
  };


  
  useEffect(() => {
    document.title = "Notifications";
  }, [])
  

  return (
    <>
      <div className='notifications-main flex-column flex align-center justify-center '>
        <div className='center'>
          <div className='heading flex align-center justify-between'>
            <h1>Notifications</h1>
            <IoSettingsOutline className='settings-icon'/>
          </div>
          <div className='notifications'>
            {isLoading ? (
              Array(10).fill(null).map((item,index)=> <FullWidthSkeletonInput $index={index} key={index}   active/>)
            ) : !data.data.length ? (
              <Empty />
            ) : (
              data.data.map((item, index) => {
                const items = [
                  {
                    key: '1',
                    label: (
                      <p onClick={() => removeItem(index, item.dataId)}>
                        Remove Item
                      </p>
                    ),
                  },
                  {
                    key: '2',
                    label: item.read ? (
                      <p onClick={() => markAsReadorUnread(index, false)}>
                        mark as unread
                      </p>
                    ) : (
                      <p onClick={() => markAsReadorUnread(index, true)}>
                        mark as read
                      </p>
                    ),
                  },
                  {
                    key: '3',
                    label: (
                      <p onClick={() => navigate(`/quiz-area/${item.dataId}/0`)}>
                        Open Item
                      </p>
                    ),
                  },
                ];

                return (
                  <div className='notification cursor-pointer flex align-center justify-between' key={index}>
                    <div className='left flex align-center'>
                      <div className='image'>
                        <img loading='lazy'  className='border-rounded' src='https://ui.shadcn.com/avatars/01.png' alt='person' />
                      </div>
                      <div className='content'>
                        <h1 className='content-heading flex'>
                          Assignment{' '}
                          <span className='flex'>
                            {item.read ? (
                              <div className='flex align-center '>
                                (<p className='status'>Done</p> <FaCheck color='#16a34a' />)
                              </div>
                            ) : (
                              <div className='status flex align-center'>
                                (<p>Not done</p> <GiCrossMark color='#dc2626' />)
                              </div>
                            )}
                          </span>
                        </h1>
                        <p className='details'>{item.message}</p>
                      </div>
                    </div>
                    <div className='right'>
                      <Dropdown
                        menu={{ items }}
                        trigger='click'
                        placement='bottom'
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <IoEllipsisHorizontal />
                      </Dropdown>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
