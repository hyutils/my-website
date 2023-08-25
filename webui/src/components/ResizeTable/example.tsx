import React from 'react';
import ResizableTable from './index';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 200,
  },
  {
    title:'', // 用于自适应多余宽度
    dataIndex:'null'
  }
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  // ...more data
];

const App = () => {
  return <ResizableTable columns={columns} dataSource={dataSource} />;
};

export default App;
