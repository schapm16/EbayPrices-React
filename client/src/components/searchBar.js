import React from 'react';

import './searchBar.css';

const SearchBar = ({ onClick }) => {
  return(
    <div className="searchBar">
      <span className="material-icons search-icon" onClick={onClick}>search</span>
      <span className="fs-xlg fw-md">Ebay PriceFinder</span>
    </div>

  );
}

export default SearchBar