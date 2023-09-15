import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Button, Dropdown, Input, Menu, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { DownOutlined } from "@ant-design/icons";
import { getChildren, updateItem, updateTreeData } from "./utils";
const { TreeNode } = Tree;

const DemoTree = () => {
  const [treeData, setTreeData] = useState([
    {
      title: "根节点 1",
      key: "1-0",
      children: [
        {
          title: "子节点 1",
          key: "1-0-0",
        },
        {
          title: "子节点 2",
          key: "1-0-1",
        },
        {
          title: "子节点3",
          key: "1-0-2",
        },
      ],
    },
    {
      title: "根节点 2",
      key: "2-1",
      children: [
        {
          title: "子节点4",
          key: "2-1-0",
        },
        {
          title: "子节点 5",
          key: "2-1-1",
        },
      ],
    },
    {
      title: "根节点 3",
      key: "3-1",
      children: [
        {
          title: "子节点6",
          key: "3-1-0",
        },
        {
          title: "子节点 7",
          key: "3-1-1",
        },
      ],
    }
  ]);
  const refInput = useRef<any>(null);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      refInput?.current?.focus({ cursor: "start" });
    }, 500);
  }, [expandedKeys]);

  const handleDrop = (info: any) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // 检查拖拽节点和目标节点是否属于同一个根节点
    const isSameRoot = dropKey.split("-")[0] === dragKey.split("-")[0];

    // const dropLength = dropKey?.split("-")?.length - 1;
    // const dragLength = dragKey?.split("-")?.length - 1;
    // 防止节点成为新的根节点
    if (info.dragNode.props.eventKey.split("-").length === 1) {
      return;
    }
    console.log("isSameRoot", isSameRoot);
    // || (isSameRoot && info?.dropPosition !== 0 && dropLength !== dragLength)
    if (!isSameRoot) {
      // 如果不属于同一个根节点，阻止拖拽
      console.log("不同");

      return false;
    }

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar: any[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };

  const overlay = (node: any) => (
    <Menu
      onClick={(e) => {
        if (e?.key === "add") addItem(node);
        if (e?.key === "edit") {
        }
      }}
    >
      <Menu.Item key="del">刪除</Menu.Item>
      <Menu.Item key="add">新增</Menu.Item>
    </Menu>
  );

  const addItem = (node: any) => {
    const len = _.isEmpty(node?.children) ? 0 : node?.children?.length;
    const newChild = _.isEmpty(node.children)
      ? [{ isInput: true, key: `${node?.key}-${len}` }]
      : [
          {
            isInput: true,
            key: `${node?.key}-${len}`,
          },
          ...node.children,
        ];
    const data = updateTreeData(treeData, node, newChild);
    setTreeData(data);
    const expands = expandedKeys?.includes(node?.key)
      ? expandedKeys
      : [node?.key, ...expandedKeys];
    setExpandedKeys(expands);
  };

  const onEnter = (e: any, node: any) => {
    const value = e?.target?.value;
    const data = updateItem(treeData, node?.key, value);
    console.log("结果", data);

    setTreeData(data);
  };

  const titleRender = (node: any) => {
    const { title, icon, key, isInput } = node;
    const paddingLeft = 16 * (node.level - 1);
    if (isInput)
      return (
        <Input
          ref={refInput}
          onPressEnter={(e) => onEnter(e, node)}
          onBlur={(e) => onEnter(e, node)}
        />
      );
    return (
      <Dropdown overlay={() => overlay(node)} trigger={["click"]}>
        <div
          key={key}
          style={{ paddingLeft, display: "flex" }}
          className="titleRoot"
        >
          {icon}&nbsp;&nbsp;
          <div>{title}</div>
        </div>
      </Dropdown>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Tree
        onDrop={handleDrop}
        draggable
        treeData={treeData}
        expandedKeys={expandedKeys}
        switcherIcon={<DownOutlined />}
        titleRender={titleRender}
        onExpand={(keys: any[]) => setExpandedKeys(keys)}
      />
    </div>
  );
};

export default DemoTree;
