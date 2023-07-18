import React from 'react'
// import BigData from './BigData';
// import TextExample from './Example';
import MyEdtior from './Myedtior';
// import Drag from './Drag';

import './style.less';
export default function index() {
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
        {/* <TextExample /> */}
        {/* <Drag /> */}
        <MyEdtior />
      </div>
      <div className='right-bigData'>
        {/* <BigData /> */}
      </div>
    </div>
  )
}
