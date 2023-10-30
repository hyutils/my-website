import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import EditorTable from "./DropTree/EditorTable";
import UploadCom from "@/components/Upload";
import Todolist from "@/pages/MyUseContext/TodoList";
import Routers from "@/pages/Routers/index";

import "./style.less";

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
          <Link to="/home/editorTable">可编辑表格</Link>
        </div>
        <div style={{ height: 32 }}>
          <Link to="/home/testRoute">路由拦截</Link>
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
