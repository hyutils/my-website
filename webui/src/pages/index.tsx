import React, { useEffect, useRef, useState } from 'react'
import G6 from '@antv/g6';
import { Button } from 'antd';
import './style.less';


const App = () => {
  const [graphData, setGraphData] = useState();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  useEffect(() => {
    drawGraph();
  }, []);

  useEffect(() => {
    graphRef?.current?.changeData(graphData);
  }, [graphData])

  const drawGraph = () => {
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || '',
      defaultNode: {
        size: 2,
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
      <div><Button>77</Button></div>
    </div>
  )
}
export default App;