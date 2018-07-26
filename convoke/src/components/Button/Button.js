import React from 'react';

// if there's data the method needs, pass it into the handler, otherwise, pass null
// children is anything passed between opening and closing tags of Button
const Button = ({ clickHandler, children, data = null }) => {
  return <button onClick={() => clickHandler(data)}>{children}</button>;
};

export default Button;
