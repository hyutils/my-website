import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";
import { RegisterCombo } from "./registerCombo";
const MyCombo: React.FC<any> = (props) => {
  const containRef = useRef<any>(null);
  const graphRef = useRef<any>(null);
  const data = {
    nodes: [
      {
        id: "4",
        comboId: "a",
      },
      {
        id: "5",
        comboId: "a",
      },
      {
        id: "6",
        comboId: "a",
      },
      {
        id: "7",
        comboId: "a",
      },
      {
        id: "8",
        comboId: "a",
      },
      {
        id: "9",
        comboId: "a",
      },


      {
        id: "16",
        comboId: "b",
      },
      {
        id: "17",
        comboId: "b",
      },
      {
        id: "18",
        comboId: "b",
      },
      {
        id: "19",
        comboId: "b",
      },
    ],
    combos: [
      {
        id: "a",
        label: "Combo A",
        size: 5,
        // fixSize: 10
      },
      {
        id: "b",
        label: "Combo B",
      },
      {
        id: "c",
        label: "Combo C",
        type: 'my-combo'
      },
      {
        id: "d",
        label: "Combo D",
        parentId: "b",
      },
    ],
  };

  useEffect(() => {
    initDraw();
  }, []);

  const initDraw = () => {
    RegisterCombo('my-combo')
    graphRef.current = new G6.Graph({
      container: containRef?.current || "",
      height: 800,
      width: 1000,
      modes: {
        default: ["drag-canvas", "drag-node", 'drag-combo'],
      },
      fitView: true,
      fitViewPadding: 20,
      animate: true,
      minZoom: 0.00000001,
      // plugins: [contextMenu],
      layout: {
        type: "comboCombined",
        spacing: 3,
        outerLayout: new G6.Layout["forceAtlas2"]({
          kr: 8,
        }),
      },
      defaultNode: {
        size: 15,
        style: {
          lineWidth: 2,
          fill: "#C6E5FF",
        },
      },
      defaultCombo: {
        size: 10,
        fixSize: 10
      }
    });

    graphRef.current.data(data);
    graphRef.current.render();

    graphRef.current.on("after");
  };



  return <div style={{ padding: 50 }} ref={containRef}></div>;
};

export default MyCombo;
