import _ from "lodash";

export const convertDataToTree = (data: any, parentKey = "") => {
  return data.map((item: any, index: number) => {
    const key = parentKey ? `${parentKey}-${index + 1}` : `${index + 1}`;
    const newNode: any = {
      title: item.name,
      key: key,
    };

    if (item.children && item.children.length > 0) {
      newNode.children = convertDataToTree(item.children, key);
    }

    return newNode;
  });
};

export const updateTreeData = (tree: any, target: any, children: any) => {
  return tree.map((node: any) => {
    if (node.key === target.key) {
      return { ...node, children };
    } else if (node?.children) {
      return {
        ...node,
        children: updateTreeData(node?.children, target, children),
      };
    }
    return node;
  });
};

export const getChildren = (tree: any, target: any) => {
  _.forEach(tree, (item) => {
    if (item?.key === target?.key) return item?.children;
    else if (item?.children) return getChildren(item?.children, target);
  });
};

export const updateItem: any = (tree: any, key: string, data: any) => {
  console.log("fdbfd", key);

  return _.map(tree, (item: any) => {
    if (item?.key === key) {
      item.title = data;
     return _.omit(item, "isInput");

    } else if (item?.children) {
      return { ...item, children: updateItem(item?.children, key, data) };
    }
    return item;
  });
};
