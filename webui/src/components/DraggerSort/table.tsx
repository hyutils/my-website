import React, { useState } from "react";
import { Table } from "antd";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

// 定义拖拽类型
const DRAG_COLUMN_TYPE = "DRAG_COLUMN_TYPE";

const DraggableTable = ({ columns, dataSource }: any) => {
  const [tableColumns, setTableColumns] = useState(columns);

  // 使用 useDrag 定义拖拽源
  const [, drag] = useDrag({
    type: DRAG_COLUMN_TYPE,
    item: { index: null },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 使用 useDrop 定义拖拽目标
  const [, drop] = useDrop({
    accept: DRAG_COLUMN_TYPE,
    hover: (item: any) => {
      const { index: dragIndex } = item;
      const hoverIndex = tableColumns.findIndex(
        (col:any) => col.key === item.column.key
      );
      if (dragIndex === hoverIndex) {
        return;
      }
      setTableColumns((prevColumns:any) => {
        const dragColumn = prevColumns[dragIndex];
        return update(prevColumns, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragColumn],
          ],
        });
      });
      item.index = hoverIndex;
    },
  });

  const onHeaderCell = (column:any) => ({
    onClick: () => {
      // 点击表头进行拖拽
      // drag({
      //   index: tableColumns.findIndex((col:any) => col.key === column.key),
      //   column,
      // });
    },
  });

  return (
    <Table
      columns={tableColumns.map((col:any) => ({
        ...col,
        onHeaderCell: () => onHeaderCell(col),
      }))}
      dataSource={dataSource}
      pagination={false}
      components={{
        header: {
          cell: drop,
        },
      }}
    />
  );
};

export default DraggableTable;
