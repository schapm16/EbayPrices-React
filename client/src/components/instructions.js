import React from 'react';

import './instructions.css';

const Instructions = () => {

  return (
    <div className="instructions-container">

    <h2 className='fs-xlg fw-md'>Welcome,</h2>

    <p>
      Looking to buy and sell a pair of athletic shoes?  
      Want to see how you compare to the competition on Ebay?
    </p>
    <p>
      Enter details about the shoes you are looking to sell and view your results!
    </p>
    <p>
      You will be provided with stats about your purchase including your: 
    </p>
    <ul>
      <li>Expected rate of return</li>
      <li>Price point</li>
      <li>Total cost to your buyer</li>
    </ul>
    <p>
      When looking at the comparison for each listing <span className='red fw-md'>negative red</span> values indicates that
      the other seller has managed a cheaper price than you - <span className='green fw-md'>green positive</span> values indicates 
      that your listing would be competitive!
    </p>
    <p>
      Select <span className="material-icons">search</span> to begin.
    </p>


    </div>

  )

}

export default Instructions;