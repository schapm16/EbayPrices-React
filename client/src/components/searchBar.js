import React from 'react';

import { Link } from 'react-router-dom';

import './searchBar.css';

const SearchBar = () => {
  return(
    <div className="searchBar">
      <Link to="/search" className="material-icons search-icon link fs-xlg">search</Link>
      <Link to="/" className="link fs-xlg fw-md">Ebay PriceChecker</Link>
    </div>

  );
}

export default SearchBar