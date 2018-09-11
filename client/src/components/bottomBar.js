import React from 'react';

import './bottomBar.css';


const BottomBar = ({ children }) => {
  return (
    <div className="bottomBar">
      {children}
    </div>
  );
}

export default BottomBar;