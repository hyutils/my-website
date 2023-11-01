import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";
import { Button } from "antd";
import { registerEdges } from "../customer/registerEdges";
import { registerCustomNode } from "../customer/registerNodes";
import _ from "lodash";

export default function GraphInstance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  useEffect(() => {
    initDraw();
  }, []);

  const initDraw = () => {
    registerEdges("cosline");
    registerCustomNode("mynode");
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || "",
      height: 800,
      modes: {
        default: ["drag-node", "drag-canvas"],
      },
      defaultNode: {
        size: 20,
        style: {
          type: "mynode",
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
          lineWidth: 0.3,
        },
        labelCfg: {
          style: {
            fontSize: 12,
          },
          position: "bottom",
          offset: 1,
        },
      },
      defaultEdge: {
        style: {
          lineWidth: 2,
          type: "cosline",
          color: "#000",
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill: "#000",
            },
          },
          endArrow: {
            fill: "#000",
            path: G6.Arrow.triangle(10, 12, 25),
            d: 25,
          },
        },
      },
      layout: {
        type: "gforce",
      },
    });

    const data = {
      nodes: [
        { id: "node1", x: 100, y: 100, label: "Node 1", type: "mynode" },
        { id: "node2", x: 300, y: 100, label: "Node 2", type: "mynode" },
      ],
      edges: [{ source: "node1", target: "node2", label: "", type: "cosline" }],
    };

    // 渲染图表
    graphRef.current.data(data);
    graphRef.current.render();

    graphRef.current.on("edge:mouseenter", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "active", true);
    });

    graphRef.current.on("edge:mouseleave", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "active", false);
    });

    graphRef.current.on("edge:click", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "selected", true);
    });

    graphRef.current.on("node:mouseenter", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "active", true);
    });

    graphRef.current.on("node:mouseleave", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "active", false);
    });

    graphRef.current.on("node:click", (evt: any) => {
      const { item } = evt;
      graphRef.current.setItemState(item, "selected", true);
    });

    graphRef.current.on("canvas:click", (evt: any) => {
      const nodes = graphRef.current.findAllByState("node", "selected");
      const edges = graphRef.current.findAllByState("edge", "selected");

      _.forEach(nodes, (item) => {
        graphRef.current.setItemState(item, "selected", false);
      });
      _.forEach(edges, (item) => {
        graphRef.current.setItemState(item, "selected", false);
      });
    });
  };

  // 更新画布数据
  const changeData = () => {
    const data = {
      nodes: [
        { id: "111", x: 100, y: 100, label: "Node 1" },
        { id: "222", x: 300, y: 100, label: "Node 2" },
        { id: "333", label: "Node 3" },
      ],
      edges: [
        { source: "111", target: "222", label: "Edge 1" },
        { source: "111", target: "333", label: "Edge 2" },
        { source: "333", target: "222", label: "Edge 3" },
      ],
    };

    graphRef.current.changeData(data);
  };

  // 渲染与更新
  const renderData = () => {
    graphRef.current.render();
    //
  };

  // 保存数据
  const saveData = () => {
    const data = graphRef.current.save();
    console.log("保存数据", data);
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        ref={containerRef}
        id="graphContainer"
        style={{ height: "100%", width: "100%" }}
      ></div>
      <div style={{ position: "absolute", bottom: "300px", left: "20px" }}>
        <Button onClick={changeData}>更新画布数据</Button>
        <Button onClick={renderData}>渲染与更新</Button>
        <Button onClick={saveData}>保存数据</Button>
        <Button onClick={saveData}>read 数据</Button>
      </div>
    </div>
  );
}
