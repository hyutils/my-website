import React from 'react'
import MyEdtior from './Myedtior';
import UploadCom from '../components/Upload';
import './style.less';
export default function index() {
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
       
        <MyEdtior />
      </div>
      <div className='right-bigData'>
        <div>上传文件</div>
        <UploadCom />
      </div>
    </div>
  )
}
