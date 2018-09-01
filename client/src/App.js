import React, { Component } from 'react';

import './App.css';

import calc from './calcs';
import api from './api';

import { Route } from 'react-router-dom';
import { SearchBar, TopBar, ListingsContainer, SearchForm } from './components'; 

class App extends Component {
  lastApiParameters = {
    keywords: '',
    apiCategory: '' 
  }

  futureState = {
    listings: [],
    myOverallStats: {}
  }
  
  state = {
    listings: [],
    myOverallStats: {},
    searchParameters: {
      apiMode: 'sold-listings',
      apiCategory: 'mens',
      page: '1'
    }
  }

  updateData = (passedSearchParameters, shouldRequestData) => {
    let currentSearchParameters = this.state.searchParameters;

    if (passedSearchParameters) {
      for (let prop in passedSearchParameters) {
        currentSearchParameters[prop] = passedSearchParameters[prop];
      }
    }

    let { keywords, apiMode, apiCategory, page, ...myPricingData } = currentSearchParameters;

    if (shouldRequestData) {
      api.get(apiMode, {
          keywords,
          apiCategory: apiCategory,
          page: '1'
        })
        .then(listingData => {
          this.lastApiParameters = { keywords, apiCategory };
          this.futureState.listings = listingData;
          this.handleData(myPricingData, listingData);
        })
        .catch(error => console.log(error));
    } else {
      this.lastApiParameters = { keywords, apiCategory }
      this.handleData(myPricingData, null);
    }
  }
  
  handleData = (myPricingData, listingData) => {
    let myOverallStats = calc.myOverallStats(myPricingData);
    let listings = (listingData) ? listingData.listings : this.futureState.listings;

    listings.forEach((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
    })

    this.futureState = {
      listings,
      myOverallStats
    };
  }

  onDone = (passedSearchParameters) => {
    this.setState(({searchParameters, listings, myOverallStats}) => {
      for (let prop in passedSearchParameters) {
        searchParameters[prop] = passedSearchParameters[prop];
      }
      
      listings = this.futureState.listings;
      myOverallStats = this.futureState.myOverallStats;
      return { searchParameters, listings, myOverallStats };
    });
  }

  render() {
    return (
      <div id="container">
        <SearchBar/>

        <Route exact path="/listings" render={() => (
          <TopBar myOverallStats={this.state.myOverallStats}/>
        )} />

        <Route exact path="/listings" render={() => (
          <ListingsContainer id="listings" listings={this.state.listings}/>
        )} />
        
        <Route exact path="/search" render={() => (        
          <SearchForm lastApiParameters={this.lastApiParameters} updateData={this.updateData} onDone={this.onDone}/>
        )} />

      </div>
    );
  }
}

export default App;

