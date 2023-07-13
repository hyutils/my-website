import React, { useState } from 'react';
import { Input, Upload, Form, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleTextChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleFileUpload = (file: any) => {
    console.log('uploading file:', file);
  };

  return (
    <div>
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={handleTextChange}
        style={{ marginBottom: 16 }}
      />
      <Dragger
        multiple={false}
        showUploadList={false}
        beforeUpload={handleFileUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Drag and drop a file here or click to select</p>
      </Dragger>
    </div>
  );
};
export default ChatInput
