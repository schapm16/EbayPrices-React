import React from 'react';

import { Link } from 'react-router-dom';

import './searchBar.css';

const SearchBar = () => {
  return(
    <div className="searchBar">
      <Link to="/search" className="material-icons search-icon fs-xlg">search</Link>
      <span className="fs-xlg fw-md">Ebay PriceFinder</span>
    </div>

  );
}

export default SearchBar