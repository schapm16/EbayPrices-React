import React from 'react';

import './inputSwitch.css';


const InputSwitch = ({ options, switchState, onClick, fontSize='fs-md' }) => {
  let btn1Class = (switchState === options.one.value) ? 'active' : '';
  let btn2Class = (switchState === options.two.value) ? 'active' : '';

  return (
    <div className={`input-switch ${fontSize}`}>
      <button type="button" id={options.one.value} className={btn1Class} onClick={onClick}>{options.one.display}</button>
      <button type="button" id={options.two.value} className={btn2Class} onClick={onClick}>{options.two.display}</button>
    </div>
  );
}

export default InputSwitch;