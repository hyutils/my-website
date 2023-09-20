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

// 更新节点
export const updateItem: any = (tree: any, key: string, data: any) => {
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
// 节点呈编辑状态
export const editTreeItem: any = (tree: any, key: string) => {
  return _.map(tree, (item: any) => {
    if (item?.key === key) {
      item.isInput = true;
      return item;
    } else if (item?.children) {
      return { ...item, children: updateItem(item?.children, key) };
    }
    return item;
  });
};

/** 删除节点 */
export const deleteNodeByKey: any = (treeData: any, keyToDelete: string) => {
  return _.map(treeData, (node) => {
    if (node.key === keyToDelete) {
      // 如果节点的key匹配要删除的key，则返回undefined，表示不包括该节点
      return undefined;
    } else if (node.children) {
      // 如果节点有子节点，则递归处理子节点
      return {
        ...node,
        children: deleteNodeByKey(node.children, keyToDelete),
      };
    }
    return node; // 其他情况下返回原始节点
  }).filter(Boolean); // 过滤掉undefined的节点
};

/** 删除节点，子节点合并到上级节点 */
export const mergeChildrenToParent: any = (
  treeData: any,
  keyToDelete: string
) => {
  return _.flatMap(treeData, (node) => {
    if (node.key === keyToDelete) {
      // 如果节点的key匹配要删除的key
      if (node.children) {
        // 如果有子节点，将子节点合并到当前节点的父节点中
        const parent = _.find(treeData, (parentNode) => {
          return _.some(parentNode.children, { key: keyToDelete });
        });

        if (parent) {
          parent.children = [
            ...(parent.children || []),
            ...(node.children || []),
          ];
        }
        return undefined; // 返回undefined，表示删除当前节点
      } else {
        return undefined; // 如果没有子节点，直接删除当前节点
      }
    } else if (node.children) {
      // 如果节点有子节点，则递归处理子节点
      return {
        ...node,
        children: mergeChildrenToParent(node.children, keyToDelete),
      };
    }
    return node; // 其他情况下返回原始节点
  }).filter(Boolean); // 过滤掉undefined的节点
};

export const mergeChildrenToParent1 = (treeData: any, keyToDelete: string) => {
  let newTreeData = _.cloneDeep(treeData);

  const findAndMerge = (tree: any, keyToDelete: string) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];

      if (node.key === keyToDelete) {
        // 找到要删除的节点
        if (node.children) {
          // 如果要删除的节点有子节点，将子节点合并到当前节点的上级节点
          tree.splice(i, 1, ...node.children);
        } else {
          // 如果要删除的节点没有子节点，直接删除
          tree.splice(i, 1);
        }
        return true;
      } else if (node.children) {
        // 递归查找并合并
        if (findAndMerge(node.children, keyToDelete)) {
          return true;
        }
      }
    }
    return false;
  };

  // 调用递归函数进行查找和合并
  findAndMerge(newTreeData, keyToDelete);

  return newTreeData;
};
