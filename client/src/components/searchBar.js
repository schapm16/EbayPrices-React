import React from 'react';

import './searchBar.css';

const SearchBar = ({ onClick }) => {
  return(
    <div className="searchBar">
      <i className="material-icons search-icon" onClick={onClick}>search</i>
      <i className="fs-xlg fw-md">Ebay PriceFinder</i>
    </div>

  );
}

export default SearchBar