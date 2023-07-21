import React from 'react'
import MyEdtior from './Myedtior';
import List from '../components/VirtualTable/list';
import TableList from '../components/VirtualTable/table'
import './style.less';
export default function index() {
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
       
        <MyEdtior />
      </div>
      <div className='right-bigData'>
     <List />
        {/* <TableList /> */}
      </div>
    </div>
  )
}
