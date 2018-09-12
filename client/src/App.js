import React, { Component } from 'react';

import './App.css';

import calc from './calcs';
import api from './api';

import { Route } from 'react-router-dom';
import { SearchBar, TopBar, ListingsContainer, BottomBar, InputSwitch, SearchForm } from './components'; 

class App extends Component {
  onListingScrollEnd_APICall_Flag = true;

  lastApiParameters = {
    keywords: '',
    apiCategory: '' 
  }

  futureState = {
    totalPages: 0,
    myOverallStats: {},
    listings: []
  }
  
  state = {
    totalPages: 0,
    myOverallStats: {},
    listings: [],
    searchParameters: {
      apiMode: 'sold-listings',
      apiCategory: 'mens',
      page: '1'
    }
  }

  updateData = (passedSearchParameters, shouldRequestData) => {
    let currentSearchParameters = Object.assign({}, this.state.searchParameters);
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
          if (listingData.listings.length === 0) return listingData;
          this.lastApiParameters = { keywords, apiCategory };
          this.futureState.listings = listingData.listings;
          this.handleData(myPricingData, listingData);
          return listingData;
        })
        .catch(error => console.log(error));
    } else {
      this.lastApiParameters = { keywords, apiCategory }
      this.handleData(myPricingData, null);
      return Promise.resolve();
    }
  }
  
  handleData = (myPricingData, listingData) => {
    let totalPages = (listingData) ? listingData.pagination.totalPages : this.futureState.totalPages;
    let myOverallStats = calc.myOverallStats(myPricingData);
    let listings = (listingData) ? listingData.listings : this.futureState.listings;

    listings.forEach((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
    })

    this.futureState = {
      totalPages,
      myOverallStats,
      listings,
    };
  }

  onDone = (passedSearchParameters) => {
    this.setState(({searchParameters, totalPages, myOverallStats, listings}) => {
      if (passedSearchParameters) {
        for (let prop in passedSearchParameters) {
          searchParameters[prop] = passedSearchParameters[prop];
        }
      }

      searchParameters.page = '1';
      searchParameters.timeStamp = new Date().toISOString();
      
      totalPages = this.futureState.totalPages;
      listings = this.futureState.listings;
      myOverallStats = this.futureState.myOverallStats;
      return { searchParameters, totalPages, myOverallStats, listings };
    });
  }

  onListingScrollEnd = ({ target }) => {
    let { offsetHeight, scrollTop, scrollHeight } = target;
    if (scrollHeight - offsetHeight - scrollTop > offsetHeight * 2 || !this.onListingScrollEnd_APICall_Flag) return;
    
    let page = parseInt(this.state.searchParameters.page, 10) + 1;
    if (page > parseInt(this.state.totalPages, 10)) return;

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

  onAPIModeChange = ({ target }) => {
    if (this.state.listings.length === 0) return;
    let apiMode = target.id;

    this.setState(({ searchParameters, listings }) => {
      searchParameters.apiMode = apiMode;
      searchParameters.page = '1';
      searchParameters.timeStamp = new Date().toISOString();
      listings = [];

      return { searchParameters, listings };
    },

    () => this.updateData(null, true)
            .then(() => this.onDone())
    ); 
  }

  render() {
    return (
      <div id="container">
        <SearchBar/>

        <Route exact path="/listings" render={() => (
          <React.Fragment>
            <TopBar myOverallStats={this.state.myOverallStats}/>
            <ListingsContainer listings={this.state.listings} onListingScrollEnd = {this.onListingScrollEnd}/>
            <BottomBar>
              <InputSwitch 
                options={{
                  one: {
                    display: 'Sold Listings',
                    value: 'sold-listings'
                  },
                  two: {
                    display: 'Active Listings',
                    value: 'active-listings'
                  }
                }}
                switchState={this.state.searchParameters.apiMode} 
                onClick={this.onAPIModeChange}
              />
            </BottomBar>
          </React.Fragment>
        )} />

        <Route exact path="/search" render={() => (        
          <SearchForm lastApiParameters={this.lastApiParameters} updateData={this.updateData} onDone={this.onDone}/>
        )} />

      </div>
    );
  }
}

export default App;

