import React from 'react';
import { Link } from 'react-router-dom';


const ChatIcon = () => {
  return (
      
      <Link replace to="/chat">
        <img
          className="chat_icon"
          src="https://cdn4.vectorstock.com/i/thumb-large/33/48/speech-bubble-color-message-icon-vector-10073348.jpg"
          alt=""
        />
      </Link>
  );
};

export default ChatIcon;