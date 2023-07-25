import {
  InsertRowLeftOutlined,
  DownOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, Tree, Menu } from "antd";
import type { DataNode } from "antd/es/tree";
import React, { useState } from "react";

import "./style.less";
const treeData: any = [
  {
    title: "爱数",
    key: "a",
    icon: <InsertRowLeftOutlined />,
    children: [
      {
        title: "研发部",
        key: "a1",
        icon: <ReconciliationOutlined />,
        children: [
          {
            title: "设计部",
            key: "a11",
            icon: <UserOutlined />,
          },
        ],
      },
      {
        title: "AnyDATA研发部",
        key: "a2",
        icon: <ReconciliationOutlined />,
        children: [
          {
            title: "设计部",
            key: "a21",
          },
        ],
      },
    ],
  },
  {
    title: "爱数子公司",
    key: "b",
    icon: <InsertRowLeftOutlined />,
    children: [],
    isLeaf: false // 强制作为父节点
  },
];

const TreeComment: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState(["a11"]);
  const [expandedKeys, setExpandedKeys] = useState(["a1"]);
  const [dropVisible, setDropVisible] = useState(false);
  const titleRender = (node: any) => {
    const { title, icon, key } = node;
    const paddingLeft = 16 * (node.level - 1);
    console.log(paddingLeft, node);

    return (
      <div key={key} style={{ paddingLeft }} className="titleRoot">
        {icon}&nbsp;&nbsp;
        <div>{title}</div>
      </div>
    );
  };

  const dropdownOverlay = (
    <div className="dropdownOverlayRoot">
      {[1, 2, 3, 4].map((item: any, index) => {
        return <div key={index} className="layItem">
          {item}
          <div> test/12 </div>
        </div>;
      })}
    </div>
  );

  const renderInput = () => {
    return (
      <Dropdown
        visible={dropVisible}
        overlay={dropdownOverlay}
        placement="bottom"
        //  trigger={['click']}
        onVisibleChange={(open) => {
          // setDropVisible(open)
        }}
      >
        <Input
          onChange={(e) => {
            if (e?.target?.value) {
              setDropVisible(true);
            }
          }}
        />
      </Dropdown>
    );
  };

  return (
    <div className="treeRoot">
      <Dropdown
        visible={dropVisible}
        overlay={dropdownOverlay}
        placement="bottom"
        onVisibleChange={(open) => {
          // setDropVisible(open)
        }}
        getPopupContainer={(e) => e.parentElement!}
      >
        <Input
          style={{ width: 200 }}
          onChange={(e) => {
            if (e?.target?.value) {
              setDropVisible(true);
            } else {
              setDropVisible(false);
            }
          }}
          onBlur={() => {
            setDropVisible(false);
          }}
        />
      </Dropdown>


      <Tree
        // showIcon
        blockNode
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        titleRender={titleRender}
      />
    </div>
  );
};

export default TreeComment;
