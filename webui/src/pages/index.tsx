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
let a = false;
const AppIndex = () => {
  
  const onCompositionStart = (e:any)=>{
    console.log(111, e);
    a= true
  }
  const onCompositionEnd = (e:any) =>{
    console.log(222, e);
    a= false
  }
  const onChange = (e:any)=>{
    if(!a){
      console.log(666,e);

    }
    
  }
  return (
    <div className="pageRoot">
      <div className="left-demo">
        {/* <MyEdtior /> */}
        <UploadCom />
      </div>
      <div className="right-bigData">
        <Todolist />
        <DropTree />``
        {/* <input onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd} onChange={onChange}/> */}
      </div>
    </div>
  );
};
export default AppIndex;
