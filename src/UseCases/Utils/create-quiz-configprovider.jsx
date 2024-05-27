import { ConfigProvider } from 'antd';
import React from 'react';

export const CreateQuizConfigProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'tranparent',
          colorBorderSecondary: 'black',
          colorPrimary: 'black',
          controlItemBgActive:'#e2e2e2',


        },
        components: {
          Input: {
            // activeBg: 'white',
            activeShadow: 'black',
            activeBorderColor: 'black',
            hoverBorderColor: 'black',
            activeBg:'#e2e2e2'
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
