import React from 'react'
import BigData from './BigData';
import TextExample from './Example';

import './style.less';
export default function index() {
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
        <TextExample />
      </div>
      <div className='right-bigData'>
        <BigData />
      </div>
    </div>
  )
}
