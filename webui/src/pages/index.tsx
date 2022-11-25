import { Button, Modal } from 'antd'
import React, { useState } from 'react'

import GraphBox from './graph';

import './style.less'
const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>点击</Button>

      <Modal
        title="弹窗"
        visible={visible}
        maskClosable={false}
        wrapClassName="graph-modal"
      >
        <GraphBox />
        {/* <p>jhdfuifh</p> */}
      </Modal>
    </div>
  )
}
export default App;