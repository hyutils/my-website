import React, { useState } from "react";
import DragLineY from "../../components/DragBox/DragY";

import "./style.less";
export default function DragY() {
  const [height, setHeight] = useState<number>(200);

  const onChangeHeight = (offsetY: number) => {
    console.log("拖动的Y", offsetY);
    const y = offsetY + height;
    const newY = y < 200 ? 200 : y > 800 ? 800 : y;
    setHeight(newY);
  };
  return (
    <div className="DragYWrapperRoot">
      <div style={{ height: `calc(100% - ${height}px)` }}>我是上半部分</div>
      <DragLineY
        className="lineY"
        style={{ bottom: height -5 }}
        onChange={onChangeHeight}
      />
      <div style={{ height }} className="bottomWrapper">
        我是下半部分
      </div>
    </div>
  );
}
