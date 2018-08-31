import React, { Component } from 'react';

import './App.css';

import calc from './calcs';

import { Route } from 'react-router-dom';
import { SearchBar, TopBar, ListingsContainer, SearchForm } from './components'; 

class App extends Component {
  currentApiParameters = {
    searchKeywords: "",
    apiCategory: "" 
  }

  futureState = {
    listings: [],
    myOverallStats: {}
  }
  
  state = {
    listings: [],
    myOverallStats: {}
  }
  
  handleData = (myPricingData, listingData, { keywords, apiCategory }) => {
    let myOverallStats = calc.myOverallStats(myPricingData);
    let listings = (listingData) ? listingData.listings : this.state.listings;

    listings.forEach((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
    })

    if (keywords) this.currentApiParameters.keywords = keywords;
    if (apiCategory) this.currentApiParameters.apiCategory = apiCategory;

    this.futureState = {
      listings,
      myOverallStats
    };
  }

  onDone = () => {
    this.setState(this.futureState);
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
          <SearchForm handleData={this.handleData} currentApiParameters={this.currentApiParameters} onDone={this.onDone}/>
        )} />

      </div>
    );
  }
}

export default App;

