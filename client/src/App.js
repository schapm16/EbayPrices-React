import React, { Component } from 'react';

import './App.css';

import api from './api';
import calc from './calcs';

import { Listing } from './components'; 

class App extends Component {
  myPricingData = {
    sale: 0.2,
    markedPrice: 79.90,
    buyerShipping: 10.50,
    profit: 15.00
  };

  currentSearch = "";
  page = 1;

  state = {
    listings: [],
    myOverallStats: {}
  };
  
  componentDidMount() { 
    api.post('/sold-listings', {
      keywords: 'Nike Free',
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
      <div>
        {this.state.listings.map((listing) => {
          return <Listing listing={listing}/>
        })}
      </div>
    );
  }
}

export default App;
