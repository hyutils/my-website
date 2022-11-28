import { Button, Modal } from 'antd'
import React, { useState, useEffect } from 'react'

import GraphBox from './graphModal';

import './style.less'
const App = () => {
  const [visible, setVisible] = useState(false);
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    initGraph();
  }, [])

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
    <div className='bigdataboot'>
      {/* <Button type='primary' onClick={() => setVisible(true)}>点击打开</Button> */}

      <div className='modal-conten-box'>
        <GraphBox graphData={graphData} />
      </div>
      {/* <Modal
        title="弹窗"
        visible={visible}
        maskClosable={false}
        wrapClassName="graph-modal"
        footer={null}
        onCancel={()=>setVisible(false)}
        width={640}
      >
        <div className='modal-conten-box'>
          <GraphBox graphData={graphData}/>
        </div>
      </Modal> */}
    </div>
  )
}
export default App;