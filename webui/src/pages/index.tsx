import React from "react";
import MyEdtior from "./Myedtior";
import { useTranslation } from "react-i18next";
import DragList from '../components/DraggerSort/list';
import FileUploader from './Upload';
import DropTree from './DropTree';
import "./style.less";

import EditorTable from "./DropTree/EditorTable";
import DraggleElement from '@/pages/DraggleElement';
import UploadCom from "@/components/Upload";
import Todolist from '@/pages/MyUseContext/TodoList';
const AppIndex = () => {
  return (
    <div className="pageRoot">
      <div className="left-demo">
        {/* <MyEdtior /> */}
        <UploadCom />
      </div>
      <div className="right-bigData">
        <Todolist />
      </div>
    </div>
  );
};
export default AppIndex;
