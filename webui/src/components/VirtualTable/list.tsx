import _ from "lodash";
import React, { useEffect, useState } from "react";
import { listData } from "./data";

type ListType = {
  itemHeight?: number;
  visibleHeight?: number;
  total?: number;
  dataSource?: any[];
};

const myList = _.map(listData, (item, index) => ({
  ...item,
  name: `${item.name}${index}`,
}));

const List = (props: ListType) => {
  const {
    itemHeight = 54,
    visibleHeight = 540,
    total = 130,
    dataSource = myList,
  } = props;
  const [showData, setShowData] = useState<any>([]);
  const [offset, setOffset] = useState<any>({ top: 0, bottom: 0 });
  const visibleCount = Math.ceil(visibleHeight / itemHeight);

  useEffect(() => {
    const list = _.slice(dataSource, 0, visibleCount);
    const bottom = (total - visibleCount) * itemHeight;
    setOffset({ top: 0, bottom });
    setShowData(list);
  }, [dataSource]);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const startIdx = Math.floor(target.scrollTop / itemHeight);
    const endIdx = startIdx + visibleCount;
    setShowData(dataSource.slice(startIdx, endIdx));
    const top = startIdx * itemHeight;
    const bottom = (total - endIdx) * itemHeight;

    setOffset({ top, bottom });
  };

  return (
    <div
      className="virtual"
      style={{
        height: visibleHeight,
        width: "100%",
        overflow: "auto",
        border: "1px solid #d9d9d9",
      }}
      onScroll={onScroll} // 在父元素上添加滚动事件监听
    >
      {/* 可视数据 */}
      <div style={{ height: visibleHeight, marginTop: offset.top }}>
        {_.map(showData, (item, index: any) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: itemHeight,
                borderBottom: "1px solid #d9d9d9",
              }}
              key={index}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      {/* 底部占位 */}
      <div style={{ height: offset.bottom }} />
    </div>
  );
};

export default List;
