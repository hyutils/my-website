import React from 'react';
import _ from 'lodash';
import { TodoProvider, UseTodoContext } from './ToDoContext'
import { Button, Checkbox, Input } from 'antd';
export default function index() {

  const Content = (props:any) =>{
    const {data, dispatch} = UseTodoContext();
   return <div>
    {
      _.map(data,item=>{
        return <div key={item?.id}>
          <Checkbox onChange={(e)=>dispatch({type: 'edit', id:item?.id, done: e?.target?.checked})}/>
          {item?.name}
          <Button onClick={()=>dispatch({type:'delete', id: item?.id}) }>删除</Button>
        </div>
      })

     
    }
     <Input placeholder='请输入事项名字' onPressEnter={(e:any)=> dispatch({type:'add', data:{name:e?.target?.value}})}/> 
   </div>
  }

  return (
    <TodoProvider> 
      <h2>这是一个列表</h2>
      <Content/>
    </TodoProvider>
  )
}
