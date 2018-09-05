import React from 'react';

import './listingsContainer.css';

import { Listing } from './';


const ListingsContainer = ({ listings, onListingScrollEnd }) => {

  return (
    <div id="listingsContainer" onScroll={onListingScrollEnd}>
      {listings.map((listing) => {
        return <Listing key={listing.itemId} listing={listing}/>
      })}
    </div>
  );

}

export default ListingsContainer;