import React from 'react'
import ChatBubble from './ChatBubble';

export default function ChatBox(props: any) {
  const { chatHistory } = props
  return (
    <div className="chat-box">
      {chatHistory.map((chat: any, index: number) => (
        <ChatBubble key={index} chat={chat} isLast={index === chatHistory?.length - 1} />
      ))}
    </div>
  );
}
