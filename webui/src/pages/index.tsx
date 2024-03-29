import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditorTable from "./DropTree/EditorTable";
import UploadCom from "@/components/Upload";
import IconFont from "@/components/IconFont";
import Todolist from "@/pages/MyUseContext/TodoList";
import Routers from "@/pages/Routers/index";
import TestG6 from "@/pages/G6_study/mode/index";

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
        <div style={{ height: 32 }}>
          <IconFont type="iconcolor-moxingbushu2" style={{ color: '#9254DE', fontSize: 20 }} />
          <Link to="/home/g6">图可视化测试</Link>
        </div>
      </div>
      <div className="right-bigData">
        <Routes>
          <Route path="/upload" element={<UploadCom />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/editorTable" element={<EditorTable />} />
          <Route path="/testRoute" element={<Routers />} />
          <Route path="/g6" element={<TestG6 />} />
        </Routes>
      </div>
    </div>
  );
};
export default AppIndex;
