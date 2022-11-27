import React, { useEffect, useRef, useState } from 'react'
import G6 from '@antv/g6';
import { Button } from 'antd';
import './style.less';


const GraphBox = (props: any) => {
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
        label:`hhhh\nbbbb`,
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
      drawGraph();
  }, [])

  const drawGraph = () => {
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || '',
      height: 500,
      width: 800,
      plugins: [contextMenu,tooltip],
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
        style: {
          endArrow: true,
          startArrow: true
        }
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
          // {
          //   type:'tooltip',
          //   formatText: model=>{
          //     return model.id as string
          //   },
          //   offset: 20
          // },
          {
            type: 'drag-canvas',
            enableOptimize: true,
          },
          {
            type:'brush-select',
            trigger:'drag'
          },
          'drag-node',
          'brush-select',
        ],
      },
    });

    graphRef?.current?.data(data);
    graphRef?.current?.render();
    graphRef?.current?.on('node:mouseenter', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', true);
    });
    graphRef?.current?.on('node:mouseleave', (e: any) => {
      const { item } = e;
      graphRef?.current?.setItemState(item, 'hover', false);
    });

    graphRef?.current?.on('node:contextmenu', (evt:any)=> {
      //当前节点定位
     console.log(111, evt);
    });
  }

  const contextMenu = new G6.Menu({
    getContent(evt:any) {
      let header;
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
        header = 'Canvas ContextMenu';
      } else if (evt.item) {
        const itemType = evt.item.getType();
        header = `${itemType.toUpperCase()} ContextMenu`;
      }
      return `
      <h3>${header}</h3>
      <ul>
        <li title='1'>li 1</li>
        <li title='2'>li 2</li>
        <li>li 3</li>
        <li>li 4</li>
        <li>li 5</li>
      </ul>`;
    },
    handleMenuClick: (target, item) => {
      console.log(target, item);
    },
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: 16 + 10,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: 0,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ['node', 'edge'],
  });
  
  const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 20,
    getContent(e:any) {
      const outDiv = document.createElement('div');
      outDiv.style.width = '180px';
      outDiv.innerHTML = `
        <h4>自定义tooltip</h4>
        <ul>
          <li>Label: ${e.item?.getModel()?.label || e.item?.getModel()?.id}</li>
        </ul>`
      return outDiv
    },
    itemTypes: ['node','edge']
  });

  return (
    <div className='index-root'>
      <div className='title' ref={containerRef} id="graphContainer"></div>
    </div>
  )
}
export default GraphBox;