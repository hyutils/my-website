import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RouteGuard from "./Prompt";
import { Button } from "antd";
function MyComponent() {
  const [isExit, setExit] = useState<boolean>(true);
  return (
    <RouteGuard when={isExit} message="不准退出">
      <div>
        <p>这是一个React组件</p>
        <Link to="/home/upload">跳转</Link>
        <Button onClick={()=> setExit(false)}>允许退出</Button>
        <Button onClick={()=> setExit(true)}>不允许退出</Button>
      </div>
    </RouteGuard>
  );
}

export default MyComponent;
