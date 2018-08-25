import React from 'react';

import './listing.css';

const Listing = (props) => {
  let priceDiff = props.listing.myListingStats.priceDiff;
  let priceDiffStyle;
  
  if (parseFloat(priceDiff) < 0) priceDiffStyle = 'my-neg'
  else priceDiffStyle = 'my-pos';

  return (
    <div className="listing fw-li">
    <p className="fw-med fs-lg">{props.listing.title}</p>
        <div className="panel1">
          <div className="panel1-left">
            <p className="fw-norm">Compare:</p>
            <p className={`fw-med ${priceDiffStyle}`}>($)  {props.listing.myListingStats.priceDiff}</p>
            <p className={`fw-med ${priceDiffStyle}`}>(%)  {props.listing.myListingStats.priceDiffPerc}</p>
          </div>
          <a href={props.listing.viewItemURL} target="_blank">
            <div className="panel1-right">
              <img src={props.listing.galleryURL}/>
            </div>
          </a>
        </div>
        <div>
          <p>Condition: {props.listing.condition}</p>
          <p>Multivariation: {props.listing.isMultiVariationListing}</p>
        </div>
        
        <div>
          <p>Selling Price: ${props.listing.price}</p>
          <p>Shipping Cost: {(parseFloat(props.listing.shippingCost) === 0) ? `$${props.listing.shippingCost}` : `Free`}</p>
        </div>
        <div>
          <p>Start time: {props.listing.startTime}</p>
          <p>End Time: {props.listing.endTime}</p>
        </div>
    </div>
  );
};

export default Listing;