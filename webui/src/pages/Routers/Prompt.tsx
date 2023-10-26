import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Modal } from "antd";

function RouteGuard({ children, when, message }: any) {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (when) {
      console.log("hhhh,进来了");
      
      const handleLeavePage = (e: any) => {
        e?.preventDefault();
        console.log("进来了");

        Modal.confirm({
          title: "提示",
          content: message || "您有未保存的更改。确定要离开吗？",
          onOk: () => {
            navigate(-1); // 确认后继续路由跳转
          },
        });
        return false; // 阻止离开页面
      };
      window.addEventListener("beforeunload", handleLeavePage);

      return () => {
        window.removeEventListener("beforeunload", handleLeavePage);
      };
    }
  }, [when, location?.pathname, message]);

  return <div>{children}</div>;
}

export default RouteGuard;
