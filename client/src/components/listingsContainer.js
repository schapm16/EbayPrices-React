import React from 'react';

import './listingsContainer.css';

import { Listing } from './';


const ListingsContainer = ({ listings }) => {

  return (
    <div id="listingsContainer">
      {listings.map((listing) => {
        return <Listing key={listing.itemId} listing={listing}/>
      })}
    </div>
  );

}

export default ListingsContainer;