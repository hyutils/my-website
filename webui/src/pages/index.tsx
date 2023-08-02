import React from "react";
import MyEdtior from "./Myedtior";
import { useTranslation } from "react-i18next";
import DragList from '../components/DraggerSort/index'
import DragY from "./Drag/dragY";
import "./style.less";
const AppIndex = () => {
  const { t } = useTranslation();
  return (
    <div className="pageRoot">
      <div className="left-demo">
        <MyEdtior />
      </div>
      <div className="right-bigData">
        <DragList />
      </div>
    </div>
  );
};
export default AppIndex;
