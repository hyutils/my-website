import React, { useState } from "react";
import { Input, Tag, Upload } from "antd";
import { DeleteOutlined, FolderOpenOutlined } from "@ant-design/icons";
import _ from "lodash";

import "./style.less";
const UploadCom = () => {
  const [fileList, setFileList] = useState<any>([]);

  const renderList = () => {
    return (
      <div className="tagWrapper">
        {_.map(fileList, (file: any) => {
          return (
            <Tag
              key={file.uid}
              className="tag"
              closable
              onClose={() => {
                setFileList((pre: any) =>
                  _.filter(pre, (p) => p?.uid !== file.uid)
                );
              }}
            >
              <span className="tagText">{file?.name}</span>
            </Tag>
          );
        })}
      </div>
    );
  };
  return (
    <div className="uploadWrapper">
      <div>
        <p>tag形式上传多个文件：</p>
        <Upload
          fileList={[]}
          multiple={true}
          showUploadList={false}
          beforeUpload={(file) => {
            setFileList((pre: any) => [...pre, file]);
            // 如果是在表单里统一提交。这里需要return false
            return false;
          }}
        >
          {/* 文件样式展示多个tag */}
          {renderList()}
        </Upload>
      </div>

      <div style={{ margin: "20px 0" }}>
        <p>上传单个文件输入框类型：</p>
        <Upload
          fileList={[]}
          multiple={true}
          showUploadList={false}
          beforeUpload={(file) => {
            setFileList((pre: any) => [...pre, file]);
            // 如果是在表单里统一提交。这里需要return false
            return false;
          }}
        >
          {/* 单个文件显示文件名 */}
          <Input
            placeholder="请选择文件"
            value={fileList?.[0]?.name}
            prefix={
              <FolderOpenOutlined style={{ color: "rgba(0,0,0,0.65)" }} />
            }
          />
        </Upload>
      </div>

      <div>
        <p>列表形式：</p>
        {_.map(fileList, (file) => {
          return (
            <div className="file-list-item">
              <div> {file.name}</div>
              <DeleteOutlined
                onClick={() => {
                  setFileList((pre: any) =>
                    _.filter(pre, (p) => p?.uid !== file.uid)
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UploadCom;
