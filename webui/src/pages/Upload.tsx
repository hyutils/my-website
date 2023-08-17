import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function FileUploader() {
  const [fileContent, setFileContent] = useState<any>(null);

  const beforeUpload = (file:any) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = JSON.parse(event?.target?.result as any)
      console.log("JSON",data);
      console.log("文件", event?.target?.result)
      // setFileContent(data?.res?.df);
    };

    reader.readAsText(file);
    return false
  };

console.log("文件内容",fileContent);

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
      {/* {fileContent && <pre>{fileContent}</pre>} */}
    </div>
  );
}

export default FileUploader;
