import React from 'react';

import './topBar.css';

const TopBar = (props) => {

  return (
    <div className="topBar">
      <div className="panel1">
        <p className="fs-lg text-center">ROI</p>
        <p className="fs-xlg fw-md text-center">{props.myOverallStats.roi}%</p>
      </div>
      <div className="panel2">
        <div className="panel2-left">
          <p className="fs-lg text-center">My Price Point</p>
          <p className="fs-xlg fw-md text-center">${props.myOverallStats.listFor}</p>
        </div>
        <div className="panel2-right">
          <p className="fs-lg text-center">Cost To Buyer</p>
          <p className="fs-xlg fw-md text-center">${props.myOverallStats.costToBuyer}</p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;