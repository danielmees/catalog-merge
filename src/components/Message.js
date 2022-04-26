import React from 'react';
import './Message.scss';

const Message = ({ type, text }) => (
  <p className={`message${type ? ` message--${type}` : ''}`}>
      {text}
  </p>
);
    
export default Message;