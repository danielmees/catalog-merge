import React from 'react';
import './Button.scss';

const Button = ({ label, handleClick }) => (
  <button className='button' onClick={handleClick}>
      {label}
  </button>
);
    
export default Button;