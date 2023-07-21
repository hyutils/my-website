import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import _ from "lodash";
type TableType = {
  itemHeight?: number; // 每一项的高度
  visibleHeight?: number; // 可见高度
  total?: number; // 数据总数
  dataSource?: any[]; // 全部数据
};
// 为了看效果我模拟的数据
const myList = Array.from(Array(1000), (item, index) => ({name: `名字${item}`, id: index}));

const VirtualTable = (props: TableType) => {
  const {
    itemHeight = 54,
    visibleHeight = 540,
    total = 130,
    dataSource = myList,
  } = props;
  const [point, setPoint] = useState<any>([0, 20]);
  const [offset, setOffset] = useState<any>({top:0, bottom: 0 });
  const tabRef = useRef<any>();
  const containRef = useRef<any>();
  const visibleCount = Math.ceil(visibleHeight / itemHeight);
  useEffect(() => {
    const bottom = (total - visibleCount) * itemHeight;
    setOffset({ bottom });
    setPoint([0, visibleCount]);
    const scrollDom = tabRef?.current?.querySelector(".ant-table-body");
    console.log("aaa",scrollDom);
    
    if (scrollDom) {
      containRef.current = scrollDom;
      containRef.current.addEventListener("scroll", onScroll);

      return () => {
        containRef.current.removeEventListener("scroll", onScroll);
      };
    }
  }, [myList]);

  const onScroll = (e: any) => {
    const startIdx = Math.floor(e?.target?.scrollTop / itemHeight);
    const endIdx = startIdx + visibleCount;
    const bottom = (total - endIdx) * itemHeight;
    const top = startIdx * itemHeight;
    setOffset({top,bottom});
    setPoint([startIdx, endIdx]);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 150 },
    { title: "名字", dataIndex: "name", width: 150 },
  ];

  return (
    <Table
      ref={tabRef}
      className="virtual-table"
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: visibleHeight }}
      components={{
        body: {
          wrapper: ({ className, children }: any) => {
            return (
              <tbody className={className}>
                {children?.[0]}
                <tr style={{height: offset.top}}/>
                {_.slice(children?.[1], point?.[0], point?.[1])}
                <tr style={{height: offset.bottom}}></tr>
              </tbody>
            );
          },
        },
      }}
    />
  );
};
export default VirtualTable;
