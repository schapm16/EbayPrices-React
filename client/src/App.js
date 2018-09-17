import React, { Component } from 'react';

import './App.css';

import calc from './calcs';
import api from './api';

import { Route } from 'react-router-dom';
import { SearchBar, TopBar, ListingsContainer, BottomBar, InputSwitch, SearchForm, Instructions } from './components'; 

class App extends Component {
  apiPromiseLog = [];
  state = {
    searchParameters: {
      apiMode: 'sold-listings',
      page: '1'
    },
    myOverallStats: {},
    listingData: [],
    apiCallInProgress: false
  }

  logApiPromise = (status) => {
    if (status === 'pending') this.apiPromiseLog.push('pending');
    else if (status === 'resolved' || status === 'rejected') this.apiPromiseLog.pop();

    if (this.apiPromiseLog.length === 0) this.setState({apiCallInProgress: false})
    else this.setState({apiCallInProgress: true}); 
  }

  getApiData = searchParameters => {
    this.logApiPromise('pending');
    const { keywords, apiMode, apiCategory, page, timeStamp = new Date().toISOString() } = searchParameters;
      return api.get(apiMode, {
          keywords,
          apiCategory,
          page,
          timeStamp: timeStamp
        })
        .then(apiData => { this.logApiPromise('resolved'); return apiData; })
        .catch(error => { this.logApiPromise('rejected'); return {}; });
  }

  getCalcData = (searchParameters, listingData) => {
    const { markedPrice, profit, sale, buyerShipping } = searchParameters;
    
    listingData = {...listingData};
    
    let myOverallStats = calc.myOverallStats({ markedPrice, profit, sale, buyerShipping });

    listingData.listings = listingData.listings.map((listing) => {
      listing.myListingStats = calc.myStatsForListing(myOverallStats, listing);
      return listing;
    })

    return { myOverallStats, listingData };

  }
  
  onUserSearchDone = (searchParameters, searchListingData) => {
    searchListingData = (searchListingData.listings) ? searchListingData : this.state.listingData;
    let { myOverallStats, listingData } = this.getCalcData(searchParameters, searchListingData);
    this.setState({ searchParameters, myOverallStats, listingData });
  }

  onListingScrollEnd = () => {
    let { searchParameters, listingData } = {...this.state};
    const prevListings = listingData.listings;
    
    const page = parseInt(searchParameters.page, 10) + 1;
    if (page > parseInt(listingData.pagination.totalPages, 10)) return;
    searchParameters.page = page;

    this.getApiData(searchParameters)
      .then(apiData => {
        listingData = apiData;
        const calcData = this.getCalcData(searchParameters, listingData);
        listingData.listings = prevListings.concat(calcData.listingData.listings);

        this.setState({ searchParameters, listingData });
      });
  }

  onAPIModeChange = ({ target }) => {
    let { searchParameters, listingData } = {...this.state};
    if (listingData.listings.length === 0) return;

    searchParameters.page = '1';
    searchParameters.apiMode = target.value;
    searchParameters.timeStamp = new Date().toISOString();

    this.setState({ searchParameters });

    this.getApiData(searchParameters)
      .then(apiData => {
        let { listingData } = this.getCalcData(searchParameters, apiData);
        this.setState({ listingData });
      });
  }

  render() {
    return (
      <div id="container">
        <SearchBar/>

        <Route exact path="/listings" render={() => (
          <React.Fragment>
            <TopBar myOverallStats={this.state.myOverallStats}/>
            
            {(this.state.listingData.listings && this.state.listingData.listings.length) ? 
            <React.Fragment>
            <ListingsContainer 
              listings={this.state.listingData.listings} 
              onListingScrollEnd={this.onListingScrollEnd}
              apiCallInProgress={this.state.apiCallInProgress}
            />
            <BottomBar>
              <InputSwitch
                name="apiMode" 
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
                onChange={this.onAPIModeChange}
              />
            </BottomBar>
            </React.Fragment>
            : null
            }
          </React.Fragment>
        )} />

        <Route exact path="/search" render={() => (        
          <SearchForm 
            lastApiParameters = {this.state.searchParameters} 
            getApiData = {this.getApiData} 
            getCalcData = {this.getCalcData}
            onUserSearchDone = {this.onUserSearchDone}
            apiCallInProgress = {this.state.apiCallInProgress}
            />
        )} 
        />

        <Route exact path="/" component={Instructions}/>

      </div>
    );
  }
}

export default App;

