import React from 'react';

const Listing = (props) => {

  return (
    <div>
      
        <div>
          <a href={props.listing.viewItemURL}>
            <img src={props.listing.galleryURL}/>
          </a>
        </div>
        <div>
          <p>Condition: {props.listing.condition}</p>
          <p>Multivariation: {props.listing.isMultiVariationListing}</p>
        </div>
        <div>
          <p>Price Diff: {props.listing.myListingStats.priceDiff}</p>
          <p>Price Diff %: {props.listing.myListingStats.priceDiffPerc}</p>
        </div>
        <div>
          <p>Selling Price: {props.listing.price}</p>
          <p>Shipping Cost: {props.listing.shippingCost}</p>
        </div>
        <div>
          <p>Start time: {props.listing.startTime}</p>
          <p>End Time: {props.listing.endTime}</p>
        </div>
      
    </div>
  );
};

export default Listing;