import React, { useEffect, useState } from 'react'
import UserImg from './user.png'
import BotImg from './bot.png'

import './chartBubble.less'

export default function ChatBubble(props: any) {
  const { chat, isLast } = props
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (isLast && chat?.from === 'bot') {
      const interval = setInterval(() => {
        setDisplayedMessage(prevMessage => {
          const nextChar = chat.message.charAt(prevMessage.length);
          if (nextChar) {
            return prevMessage + nextChar;
          } else {
            clearInterval(interval);
            return prevMessage;
          }
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setDisplayedMessage(chat?.message)
    }

  }, [chat.message]);

  const messageClass = chat.from === "bot" ? "message-left" : "message-right";

  return (
    <div className={`chat-bubble ${chat.from}`}>
      <div className="avatar-container ">
        <img
          src={chat.from === "bot" ? BotImg : UserImg}
          alt={chat.from}
        />
      </div>
      <div className={`message-container ${messageClass}`}>
        <div className="triangle"></div>
        <p className="message-text">{displayedMessage}</p>
      </div>
    </div>
  );
};
