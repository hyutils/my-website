import React, { useEffect, useRef, useState, memo } from 'react'
import G6 from '@antv/g6';
import './style.less';

const GraphBox = (props: any) => {
  const { graphData } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  useEffect(() => {
    console.log(111);
    drawGraph();
    // graphRef?.current?.changeData(graphData);
  }, []);

  useEffect(() => {
    console.log(222, graphData, graphRef?.current);
    graphRef?.current?.changeData(graphData);
  }, [graphData])

  const drawGraph = () => {
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || '',
      height: 800,
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
    graphRef?.current.get('canvas').set('localRefresh', false);
    graphRef?.current.data({ nodes: [], edges: [] })
    graphRef?.current?.render();
    graphRef?.current?.on('node:mouseenter', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', true);
    });
    graphRef?.current?.on('node:mouseleave', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', false);
    });
  }


  return (
    <div className='ModalgraphContainer' ref={containerRef} id="graphContainer"></div>
  )
}
export default memo(GraphBox);