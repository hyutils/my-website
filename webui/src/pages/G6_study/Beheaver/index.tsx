import React, {useEffect, useRef} from 'react';
import G6 from '@antv/g6';
 const Beheaviors: React.FC<any>=(props:any)=> {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  useEffect(()=>{
    initDraw()
  },[])

  const initDraw=()=>{
    graphRef.current = new G6.Graph({
      linkCenter:true,
      container: containerRef.current || '',
      height: 800,
      width:containerRef.current?.clientWidth,
      defaultNode: {
        size: 20,
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
          lineWidth: 0.3,
        },
        labelCfg: {
          style: {
            fontSize: 12,
          },
          position: 'bottom',
          offset: 1,
        },
      },
      defaultEdge: {
        style: {
          lineWidth: 2,
          color: '#000',
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill: '#000'
            }
          },
          endArrow: {
            fill: '#000',
            path: G6.Arrow.triangle(10, 12, 25),
            d: 25
          }
        }
      }
    });

    const data = {
      nodes: [
        { id: 'node1', x: 100, y: 100, label: 'Node 1' },
        { id: 'node2', x: 300, y: 100, label: 'Node 2' },
      ],
      edges: [
        { source: 'node1', target: 'node2', label: 'Edge 1' },
      ],
    };

    // 渲染图表
    graphRef.current.data(data);
    graphRef.current.render();
  }

  return (
     <div className='ModalgraphContainer' ref={containerRef} id="graphContainer"></div>
  )
}
export default Beheaviors;