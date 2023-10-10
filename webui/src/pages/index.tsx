import React from "react";
import MyEdtior from "./Myedtior";
import { useTranslation } from "react-i18next";
import DragList from '../components/DraggerSort/list';
import FileUploader from './Upload';
import DropTree from './DropTree'
import "./style.less";
import EditorTable from "./DropTree/EditorTable";
import UploadCom from "@/components/Upload";
const AppIndex = () => {
  const { t } = useTranslation();
  return (
    <div className="pageRoot">
      <div className="left-demo">
        {/* <MyEdtior /> */}
        <UploadCom />
      </div>
      <div className="right-bigData">
        {/* <FileUploader /> */}
        <DropTree />
        <div style={{height:100}}></div>
        <EditorTable />
      </div>
    </div>
  );
};
export default AppIndex;
