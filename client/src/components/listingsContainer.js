import React from 'react';

import './listingsContainer.css';

import { Listing } from './';


const ListingsContainer = (props) => {

  return (
    <div id="listingsContainer">
      {props.listings.map((listing) => {
        return <Listing key={listing.itemId} listing={listing}/>
      })}
    </div>
  );

}

export default ListingsContainer;