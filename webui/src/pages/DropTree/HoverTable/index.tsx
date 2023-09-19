import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Table } from "antd";
import Img from "./caozuo.svg";
import "./style.less";
import { Menu } from "@antv/g6";
const HoverTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <div className="optionWrapper">
              <img src={Img} alt="操作" className="img" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div className="hoverTableRoot">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={({ key }) => key}
        rowSelection={{
          fixed: true,
          type: "checkbox",
          selectedRowKeys,
          onChange: (keys: any) => setSelectedRowKeys(keys),
        }}
        onRow={(record: any) => {
          return {
            onClick: () => {},
          };
        }}
      />
    </div>
  );
};
export default HoverTable;
