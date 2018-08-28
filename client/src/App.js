import React, { Component } from 'react';

import './App.css';

import calc from './calcs';

import { SearchBar, TopBar, ListingsContainer, Modal, SearchForm } from './components'; 

class App extends Component {
  currentSearchKeywords = ""

  state = {
    listings: [],
    myOverallStats: {},
    displayModal: false
  }
  
  searchBar_Click = () => {
    this.setState({displayModal: true});
  }

  handleData = (myPricingData, listingData, keywords) => {
    let myOverallStats = calc.myOverallStats(myPricingData);
    let listings = (listingData) ? listingData.listings : this.state.listings;

    listings.forEach((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
    })

    if (keywords) this.currentSearchKeywords = keywords;

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
          <SearchForm handleData={this.handleData} currentSearchKeywords={this.currentSearchKeywords}/>
        </Modal>
        
      </div>
    );
  }
}

export default App;

