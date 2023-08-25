import React, { useRef, useState } from "react";
import { Select } from "antd";

const Option = Select.Option;

const Hello = () => {
  const conRef = useRef<any>();
  const [open, setOpen] = useState<boolean>(false); // 每次打开下拉框重新渲染挂载节点
 /** 动态获取挂载节点 */
  const getContainer = () => {
    if (conRef?.current?.scrollHeight > 400) {
      return conRef?.current;
    }
    return document.body;
  };
  return (
    <div style={{ margin: 10, overflow: "scroll", height: 200 }}>
      <h2>Select in a scrollable area</h2>
      <div
        style={{
          padding: 100,
          height: 1000,
          background: "#eee",
          position: "relative",
        }}
        id="area"
        ref={conRef}
        key={`${open}`}
      >
        <h4>可滚动的区域 / scrollable area</h4>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          getPopupContainer={() => getContainer()}
          onDropdownVisibleChange={(e) => setOpen(e)}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
      </div>
    </div>
  );
};

export default Hello;
