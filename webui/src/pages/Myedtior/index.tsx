import React, { useState } from 'react'
import ReactCodeMirror from '../../components/CodeMirror'
export default function MyEdtior() {
  const [value, setValue] = useState<any>('');

  const onChange = (e:any) =>{
    console.log("输入",e);
    
    
  }
  return (
    <div>
      <div>输入</div>
      <ReactCodeMirror value={value} onChange={onChange}/>
    </div>
  )
}
