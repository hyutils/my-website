import React, { useEffect, useRef, useState } from 'react'
import G6 from '@antv/g6';
import { Button } from 'antd';
import './style.less';


const GraphBox = (props: any) => {
  const { visible } = props;
  const [graphData, setGraphData] = useState();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

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
      },
    ],
  };

  useEffect(() => {
    console.log(1111);
    if (graphData) {
      drawGraph();
      graphRef?.current?.changeData(graphData);
    }

  }, [graphData])

  const drawGraph = () => {
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || '',
      height: 500,
      width: 800,
      defaultNode: {
        size: 20,
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
          lineWidth: 0.3,
        },
        labelCfg: {
          style: {
            fontSize: 3,
          },
          position: 'right',
          offset: 1,
        },
      },
      defaultEdge: {
        size: 0.1,
        color: '#333',
      },
      nodeStateStyles: {
        selected: {
          fill: 'steelblue',
          stroke: '#000',
          lineWidth: 1,
        },
        hover: {
          fill: 'red',
          stroke: '#000',
          lineWidth: 1,
        },
      },
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            enableOptimize: true,
            optimizeZoom: 0.9,
          },
          {
            type: 'drag-canvas',
            enableOptimize: true,
          },
          'drag-node',
          'brush-select',
        ],
      },
    });

    // graphRef?.current?.data(data);
    // graphRef?.current?.render();
    graphRef?.current?.on('node:mouseenter', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', true);
    });
    graphRef?.current?.on('node:mouseleave', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', false);
    });
  }

  const initGraph = () => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
      .then((res) => res.json())
      .then((data) => {
        data.nodes.forEach((node: any) => {
          node.label = node.olabel;
          node.degree = 0;
          data.edges.forEach((edge: any) => {
            if (edge.source === node.id || edge.target === node.id) {
              node.degree++;
            }
          });
        });
        mapNodeSize(data.nodes, 'degree', [1, 10]);
        setGraphData(data);
      });
  }

  const mapNodeSize = (nodes: any, propertyName: any, visualRange: any) => {
    let minp = 9999999999;
    let maxp = -9999999999;
    nodes.forEach((node: any) => {
      node[propertyName] = Math.pow(node[propertyName], 1 / 3);
      minp = node[propertyName] < minp ? node[propertyName] : minp;
      maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
    });
    const rangepLength = maxp - minp;
    const rangevLength = visualRange[1] - visualRange[0];
    nodes.forEach((node: any) => {
      node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0];
    });
  };

  return (
    <div className='index-root'>
      <Button type='primary' onClick={initGraph}>点击</Button>
      <div className='title' ref={containerRef} id="graphContainer"></div>
    </div>
  )
}
export default GraphBox;