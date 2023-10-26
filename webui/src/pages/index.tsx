import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MyEdtior from "./Myedtior";
import { useTranslation } from "react-i18next";
import DragList from "../components/DraggerSort/list";
import FileUploader from "./Upload";
import DropTree from "./DropTree";
import "./style.less";

import EditorTable from "./DropTree/EditorTable";
import DraggleElement from "@/pages/DraggleElement";
import UploadCom from "@/components/Upload";
import Todolist from "@/pages/MyUseContext/TodoList";
import Routers from "@/pages/Routers/index";
const AppIndex = () => {
  return (
    <div className="pageRoot">
      <div className="left-demo">
        <div style={{ height: 32 }}>
          <Link to="/home/upload">上传文件</Link>
        </div>
        <div style={{ height: 32 }}>
          <Link to="/home/todolist">todolist</Link>
        </div>
        <div style={{ height: 32 }}>
          <Link to="/home/editorTable">可编辑Table</Link>
        </div>
        <div style={{ height: 32 }}>
          <Link to="/home/testRoute">Prompt</Link>
        </div>
      </div>
      <div className="right-bigData">
        <Routes>
          <Route path="/upload" element={<UploadCom />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/editorTable" element={<EditorTable />} />
          <Route path="/testRoute" element={<Routers />} />
        </Routes>
      </div>
    </div>
  );
};
export default AppIndex;
