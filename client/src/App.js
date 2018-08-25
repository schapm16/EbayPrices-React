import React, { Component } from 'react';

import './App.css';

import api from './api';
import calc from './calcs';

import { Listing } from './components'; 

class App extends Component {
  myPricingData = {
    sale: 0.2,
    markedPrice: 38.99,
    buyerShipping: 10.50,
    profit: 15.00,
    stateTax: 0.075
  };

  currentSearch = "";
  page = 1;

  state = {
    listings: [],
    myOverallStats: {}
  };
  
  componentDidMount() { 
    api.post('/sold-listings', {
      keywords: 'Nike Cortez Ultra',
      gender: 'mens',
      page: this.page
    })
    .then(response => {

      let myOverallStats = calc.myOverallStats(this.myPricingData)

      response.listings.forEach((listing) => {
        listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
      })

      this.setState({
        listings: response.listings,
        myOverallStats
      });

      this.page = response.pagination.pageNumber;
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div id="container">
        {this.state.listings.map((listing) => {
          return <Listing key={listing.itemId} listing={listing}/>
        })}
      </div>
    );
  }
}

export default App;
