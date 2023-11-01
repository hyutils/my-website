import G6 from "@antv/g6";
import _ from "lodash";
export const RegisterAddNode = () => {
  G6.registerBehavior("create-node", {
    getEvents() {
      return {
        // 监听 createOn 事件，触发 createNode 方法
        "canvas:dblclick": "createNode",
      };
    },
    createNode(e: any) {
      const graph: any = this.graph;
      // 获取鼠标位置
      const point = graph.getPointByClient(e.clientX, e.clientY);
      // 创建新节点
      graph.addItem("node", {
        x: point.x,
        y: point.y,
        size: 32,
        id: _.uniqueId("_node"),
        label: "New node",
        // group: true,
      });
    },
  });
};
