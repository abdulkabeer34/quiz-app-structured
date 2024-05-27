import { Button,  Modal } from 'antd';
import React from 'react';
import { CreateQuizConfigProvider } from '../create-quiz-configprovider';

export const AntdModal = ({
  message,
  open,
  confirmLoading,
  header,
  setOpen,
  footerMessage,
  closeModal,
  onOk,
  ...restProps
}) => {
  return (
    <Modal
      open={open}
      {...restProps}
      cancelText={false}
      centered
      onCancel = {closeModal}
      footer={
        <CreateQuizConfigProvider theme={{ token: { colorPrimary: 'black' } }}>
          <Button type='primary' onClick={onOk} loading={confirmLoading}>
            {footerMessage}
          </Button>
        </CreateQuizConfigProvider>
      }
    >
      {header && header}
      {message}
    </Modal>
  );
};
