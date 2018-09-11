import React from 'react';

import './topBar.css';

const TopBar = ({ myOverallStats }) => {

  let roiStyle;

  if (myOverallStats.roi > 0) roiStyle = 'green';
  else roiStyle = 'red';

  return (
    <div className="topBar">
      <div className="panel-top">
        <div className="panel-left">
          <p className={`fs-xlg fw-md text-center ${roiStyle}`}>{myOverallStats.roi}%</p>
          <p className="fs-sm">ROI</p>
        </div>
        <div className="panel-center">
          <p className="fs-xlg fw-md text-center">${myOverallStats.listFor}</p>
          <p className="fs-sm">My Price Point</p>
        </div>
        <div className="panel-right">
          <p className="fs-xlg fw-md text-center">${myOverallStats.costToBuyer}</p>
          <p className="fs-sm">Cost To Buyer</p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;