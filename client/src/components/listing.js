import React from 'react';

import './listing.css';

const Listing = ({ listing }) => {
  let { myListingStats } = listing;
  let priceDiffStyle = (parseFloat(myListingStats.priceDiff) < 0) ? 'green' : 'red';
  let durationTimeStyle = (parseFloat(listing.durationTime) < 30) ? 'green' : 'red';  

  return (
    <div className="listing fw-li">
      <div className="panel1">
        <p className="fw-md fs-lg">{listing.title}</p>
      </div>
      <div className="panel2">
        <p className="fs-sm">{listing.condition}</p>
        <p className="fs-sm">{listing.listingType}</p>
      </div>
      <div className="panel3">
        <div className="panel3-left">
          <p className="fw-nm">Compare:</p>
          <p className={`fw-md ${priceDiffStyle}`}>($)  {myListingStats.priceDiff}</p>
          <p className={`fw-md ${priceDiffStyle}`}>(%)  {myListingStats.priceDiffPerc}</p>
        </div>
        <a href={listing.viewItemURL} target="_blank">
          <div className="panel3-right">
            <img src={listing.galleryURL} alt={listing.title}/>
          </div>
        </a>
      </div>
      <div className="panel4">
        <p>Selling Price: <span className="fw-md">${listing.price}</span></p>
        <p>Shipping Cost: <span className="fw-md">${listing.shippingCost}</span></p>
      </div>
      <div className="panel5">
        <p className="text-center">Listed For: <span className={`fw-md ${durationTimeStyle}`}>{listing.durationTime} days</span></p>
        <p className="fs-sm text-center">{listing.startTime} - {listing.endTime}</p>
      </div>
    </div>
  );
};

export default Listing;