import React, { useState } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css'; // 引入样式

const ResizableTitle = (props:any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const ResizableTable = ({ columns, dataSource }:any) => {
  const [columnWidths, setColumnWidths] = useState<any>({});

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const handleResize = (index: number) => (e:any, { size }:any) => {
    setColumnWidths((prevWidths:any) => ({
      ...prevWidths,
      [index]: size.width,
    }));
  };

  const resizableColumns = columns.map((col:any, index:number) => ({
    ...col,
    width: columnWidths[index] || col.width,
    onHeaderCell: (column:any) => ({
      width: columnWidths[index] || column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      components={components}
      columns={resizableColumns}
      dataSource={dataSource}
    />
  );
};

export default ResizableTable;
