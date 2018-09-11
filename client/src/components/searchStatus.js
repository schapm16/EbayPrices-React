import React from 'react';

import './searchStatus.css';



const SearchStatus = ({ status }) => {
  let statusMessage;

  switch(status) {
    case 'searching':
      statusMessage = <span className="material-icons searchStatus-searching">create</span>
      break;
    case 'keywords length':
      statusMessage = <span className = "searchStatus-message">Enter valid search</span>
      break;
    case 'no results':
      statusMessage = <span className = "searchStatus-message">No Results Found</span>
      break;  
    case 'price null':
      statusMessage =  <span className = "searchStatus-message">Enter the store price</span>
      break;
    case 'profit null':
      statusMessage =  <span className = "searchStatus-message">Enter your desired profit</span>
      break;
    case 'done':
      statusMessage =  <span className="material-icons searchStatus-done">check_circle_outline</span>
      break;
    default: 
      statusMessage = null;
  }

  return statusMessage;

}


export default SearchStatus;