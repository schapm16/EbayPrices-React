import React from 'react';

import './inputSwitch.css';


const InputSwitch = ({ name, options, switchState, onChange, fontSize='fs-md' }) => {
  let label1Class = (switchState === options.one.value) ? 'active' : '';
  let label2Class = (switchState === options.two.value) ? 'active' : '';

  return (
    <div className={`input-switch text-center ${fontSize}`}>
      <label for={options.one.value} className={label1Class}>{options.one.display}
        <input type="radio" id={options.one.value} name={name} value={options.one.value} onChange={onChange}/>
      </label>
      <label for={options.two.value} className={label2Class}>{options.two.display}
        <input type="radio" id={options.two.value} name={name} value={options.two.value} onChange={onChange}/>
      </label>
    </div>
  );
}

export default InputSwitch;