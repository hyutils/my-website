import React, { useEffect, useRef } from 'react'
import G6 from '@antv/g6';
import './style.less';


const GraphBox = (props: any) => {
  const gcontainerRef = useRef<HTMLDivElement>(null);
  const graphRef1 = useRef<any>();

  const data = {
    // 点集
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 200,
      },
      {
        id: 'node2',
        x: 300,
        y: 200,
      },
    ],
    // 边集
    edges: [
      // 表示一条从 node1 节点连接到 node2 节点的边
      {
        source: 'node1',
        target: 'node2',
        label: `hhhh\nbbbb`,
        style: {
          endArrow: {
            path: G6.Arrow.triangle(10, 20, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
            d: 25,
            fill: '#333',
          },
          startArrow: true
        }
      },
    ],
  };

  useEffect(() => {
    if (graphRef1?.current) return;
    drawGraph();
  }, [])

  const drawGraph = () => {
    graphRef1.current = new G6.TreeGraph({
      linkCenter: true,
      container: gcontainerRef.current || '',
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item: any, collapsed) {
              const data = item.getModel();
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d: any) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graphRef1?.current?.data(data);
    graphRef1?.current?.render();
  }

  return (
    <div className='index-root1'>
      <div className='title' ref={gcontainerRef} id="gContainer"></div>
    </div>
  )
}
export default GraphBox;