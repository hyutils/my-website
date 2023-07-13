import React, { useState, useEffect, useRef } from 'react'
import ChatBox from './ChatBox'
import { Button, Input } from 'antd';
import ChatInput from './InputBox';
import './index.less'
export default function Index() {
  const [chatHistory, setChatHistory] = useState<any>([
    { message: "您好， 我是KG认知大模型", from: "bot" },
    // { message: "Hi there!", from: "user" }
  ]);
  const areaRef = useRef<any>();

  const onSearch = () => {
    console.log(areaRef?.current);

    console.log("aa", areaRef?.current?.resizableTextArea?.textArea?.value);
    const value = areaRef?.current?.resizableTextArea?.textArea?.value
    setChatHistory([...chatHistory, { message: value, from: 'user' }])
    setTimeout(() => {
      setChatHistory((pre: any) => [...pre, { message: '好的，请稍等', from: 'bot' }])

    }, 1000)
  }

  return (
    <div className="myChart" style={{ border: '1px solid #999', height: '100%', padding: '20px ' }}>
      <div className='messageWrapper'>
        <ChatBox chatHistory={chatHistory} setChatHistory={setChatHistory} />
      </div>
      <div className='bottomWrapper'>
        {/* <Input.TextArea rows={4} placeholder="请输入想了解的内容" maxLength={6} ref={areaRef} />
        <Button type='primary' className='sendBtn' onClick={onSearch}>发送</Button> */}
        <ChatInput />
      </div>
    </div>
  )
}
