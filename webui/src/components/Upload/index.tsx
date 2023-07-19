import React, { useState } from "react";
import { Button, Tag, Upload } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
      <Upload
        fileList={[]}
        multiple={true}
        showUploadList={false}
        beforeUpload={(file) => {
          setFileList((pre: any) => [...pre, file]);
          return false;
        }}
      >
        {/* <Button type="primary">上传</Button> */}
        {renderList()}
      </Upload>
      <div>
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
