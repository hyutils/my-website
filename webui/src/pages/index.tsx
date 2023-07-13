import React from 'react'
// import BigData from './BigData';
// import TextExample from './Example';
import Drag from './Drag';
import './style.less';
export default function index() {
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
        {/* <TextExample /> */}
        <Drag />
      </div>
      <div className='right-bigData'>
        {/* <BigData /> */}
      </div>
    </div>
  )
}
