import React, { Component } from 'react';

import './App.css';

import calc from './calcs';

import { SearchBar, TopBar, ListingsContainer, Modal, SearchForm } from './components'; 

class App extends Component {
  currentApiParameters = {
    searchKeywords: "",
    apiCategory: "" 
  }
  
  state = {
    listings: [],
    myOverallStats: {},
    displayModal: false
  }
  
  searchBar_Click = () => {
    this.setState({displayModal: true});
  }

  handleData = (myPricingData, listingData, { keywords, apiCategory }) => {
    let myOverallStats = calc.myOverallStats(myPricingData);
    let listings = (listingData) ? listingData.listings : this.state.listings;

    listings.forEach((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
    })

    if (keywords) this.currentApiParameters.keywords = keywords;
    if (apiCategory) this.currentApiParameters.apiCategory = apiCategory;

    this.setState({
      listings,
      myOverallStats,
      displayModal: false
    });
  }

  render() {
    return (
      <div id="container">
        <SearchBar onClick={this.searchBar_Click}/>
        <TopBar myOverallStats={this.state.myOverallStats}/>
        <ListingsContainer id="listings" listings={this.state.listings}/>
        <Modal active={this.state.displayModal}>
          <SearchForm handleData={this.handleData} currentApiParameters={this.currentApiParameters}/>
        </Modal>
        
      </div>
    );
  }
}

export default App;

