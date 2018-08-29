import React from 'react';

import './apiCategory.css';


const ApiCategory = ({ apiCategory, changeApiCategory }) => {
  let mensClass = (apiCategory === 'mens') ? 'active' : '';
  let womensClass = (apiCategory === 'womens') ? 'active' : '';

  return (
    <div className="apiCategory">
      <button type="button" id="mens" className={mensClass} onClick={changeApiCategory}>Men's</button>
      <button type="button" id="womens" className={womensClass} onClick={changeApiCategory}>Women's</button>
    </div>
  );
}

export default ApiCategory;