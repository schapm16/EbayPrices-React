import React from 'react';

import './input.css';


const Input = ({ type, name, text, unit, value }) => {
  let justify = '';

  if (unit === '$') justify = 'justify-left'
  else if (unit === '%') justify = 'justify-right'
  else justify='justify-center';

  return (
    <div className = "input-field">
      <label className={`input-box ${justify}`} htmlFor={name}>
        {(unit === '$') ? <span className="symbol">$</span> : null}
        <input type={type} id={name} name={name} value= {value}/>
        {(unit === '%') ? <span className="symbol">%</span> : null}
      </label>
      <span className="input-label">{text}</span>
    </div>
  );
}

export default Input;