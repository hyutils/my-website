import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import * as hhh from 'react-router-dom'
import Hmoe from "@/pages/index";
import Login from "@/pages/index";
export default function routers() {
  console.log("gfb", hhh);
  
  return (
    <div style={{height:'100%'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/home/*" element={<Hmoe />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
