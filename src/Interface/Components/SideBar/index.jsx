import React, { useEffect, useState } from 'react';
import { HistoryOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CreateQuizConfigProvider } from '../../../UseCases/Utils';
import { SideBarMenu } from './styled-components';

const items = [
  { key: '0', icon: <HistoryOutlined />, label: <Link to='/quiz-history'> <p>History</p> </Link> },
  { key: '1', icon: <VideoCameraOutlined />, label: <Link to='/create-quiz'> <p>Create Quiz</p> </Link> },
  { key: '2', icon: <IoNotificationsOutline />, label: <Link to='/notifications'>Notifications</Link> },
];

const paths = [
  'quiz-history', 'create-quiz', 'notifications'
];

export const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const [index, setIndex] = useState('0');

  useEffect(() => {
    const currentPath = paths.indexOf(location.pathname.split('/')[1]);
    if (currentPath !== -1) {
      setIndex(currentPath.toString());
    }
  }, [location.pathname]);

  return (
    <CreateQuizConfigProvider>
      <Drawer title='Quiz App' onClose={onClose} open={open}>
        <SideBarMenu
          theme='dark'
          mode='inline'
          selectedKeys={[index]}
          items={items}
          activeKey={index}
          onTitleClick={onClose}
        />
      </Drawer>
    </CreateQuizConfigProvider>
  );
};
