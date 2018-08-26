import React from 'react';

import './listing.css';

const Listing = (props) => {
  let priceDiff = props.listing.myListingStats.priceDiff;
  let priceDiffStyle;
  
  if (parseFloat(priceDiff) < 0) priceDiffStyle = 'my-neg'
  else priceDiffStyle = 'my-pos';

  return (
    <div className="listing fw-li">
      <p className="fw-md fs-lg">{props.listing.title}</p>
      <p className="fs-sm">{props.listing.condition}</p>
      <div className="panel1">
        <div className="panel1-left">
          <p className="fw-nm">Compare:</p>
          <p className={`fw-md ${priceDiffStyle}`}>($)  {props.listing.myListingStats.priceDiff}</p>
          <p className={`fw-md ${priceDiffStyle}`}>(%)  {props.listing.myListingStats.priceDiffPerc}</p>
        </div>
        <a href={props.listing.viewItemURL} target="_blank">
          <div className="panel1-right">
            <img src={props.listing.galleryURL}/>
          </div>
        </a>
      </div>
      <div>
        <p>Multivariation: {props.listing.isMultiVariationListing}</p>
      </div>
        
      <div>
        <p>Selling Price: <span className="fw-md">${props.listing.price}</span></p>
        <p>Shipping Cost: <span className="fw-md">{(parseFloat(props.listing.shippingCost) !== 0) ? `$${props.listing.shippingCost}` : `Free`}</span></p>
      </div>
      <div>
        <p>Start time: {props.listing.startTime}</p>
        <p>End Time: {props.listing.endTime}</p>
      </div>
    </div>
  );
};

export default Listing;