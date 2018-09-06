import React, { Component } from 'react';

import './App.css';

import calc from './calcs';
import api from './api';

import { Route } from 'react-router-dom';
import { SearchBar, TopBar, ListingsContainer, SearchForm } from './components'; 

class App extends Component {
  onListingScrollEnd_APICall_Flag = true;

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

    let { keywords, apiMode, apiCategory, page, timeStamp, ...myPricingData } = currentSearchParameters;
    if (shouldRequestData) {
      return api.get(apiMode, {
          keywords,
          apiCategory: apiCategory,
          page: page,
          timeStamp: timeStamp || new Date().toISOString()
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
      return Promise.resolve();
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

      searchParameters.page = '1';
      searchParameters.timeStamp = new Date().toISOString();
      
      listings = this.futureState.listings;
      myOverallStats = this.futureState.myOverallStats;
      return { searchParameters, listings, myOverallStats };
    });
  }

  onListingScrollEnd = ({ target }) => {
    let page = parseInt(this.state.searchParameters.page, 10) + 1;
    let { offsetHeight, scrollTop, scrollHeight } = target;

    if (scrollHeight - offsetHeight - scrollTop > 600 || !this.onListingScrollEnd_APICall_Flag) return;
    
    this.onListingScrollEnd_APICall_Flag = false;
    this.updateData({ page }, true)
      .then(() => {
        this.setState(({ searchParameters, listings }) => {
          listings = listings.concat(this.futureState.listings);
          searchParameters.page = page;
          return { searchParameters, listings };
        }, () => this.onListingScrollEnd_APICall_Flag = true)
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
          <ListingsContainer listings={this.state.listings} onListingScrollEnd = {this.onListingScrollEnd}/>
        )} />
        
        <Route exact path="/search" render={() => (        
          <SearchForm lastApiParameters={this.lastApiParameters} updateData={this.updateData} onDone={this.onDone}/>
        )} />

      </div>
    );
  }
}

export default App;

