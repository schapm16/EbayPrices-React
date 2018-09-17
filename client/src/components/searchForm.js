import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { Input, InputSwitch, SearchStatus } from './';
import utils from '../utils';

import './searchForm.css';

class SearchForm extends Component {

  lastApiParameters = {}
  inputTimer = ''
  futureListingData = {}

  state = {
    searchParameters: {
      page: '1',
      apiCategory: this.props.lastApiParameters.apiCategory || 'mens',
      keywords: '',
      sale: '20',
      buyerShipping: '10.50',
      apiMode: this.props.lastApiParameters.apiMode || 'sold-listings'
    },
    viewResultsClicked: false,
    searchStatus: '',
  }

  transformInput = ({ name, value}) => {
    let match;
    switch (name) {
      case 'markedPrice':
      case 'profit':
      case 'buyerShipping': 
        match = value.match(/[1-9]\d*\.?\d?\d?/);
        value = (match) ? match[0] : '0';
        return { name, value };

      case 'sale':
        match = value.match(/[1-9]\d?/);
        value = (match) ? match[0] : '0';
        return { name, value };

      default:
        return { name, value };
    }
  }

  setSearchStatus = () => {
    const { keywords, markedPrice, profit } = this.state.searchParameters
    let searchStatus = '';

    if (keywords.length < 4) searchStatus = 'keywords length';
    else if (this.props.apiCallInProgress) searchStatus ='searching';
    else if (this.futureListingData.status === 'no results') searchStatus = 'no results';
    else if (!markedPrice) searchStatus = 'price null';
    else if (!profit) searchStatus = 'profit null';
    else searchStatus = 'done';

    this.setState({ searchStatus });
  }

  onChange = event => {
    const { name, value } = this.transformInput(event.target);
    this.setState(({searchParameters, searchStatus}) => {
      searchParameters = {...searchParameters};
      searchParameters[name] = value;
      searchStatus = 'searching'; 
      return { searchParameters, searchStatus };
    });
  }

  shouldMakeApiCall = () => {
    const keywordsMinLength = this.state.searchParameters.keywords.length >= 4
    
    const areDiffKeywords = this.state.searchParameters.keywords !== this.lastApiParameters.keywords;
    const isDiffCategory = this.state.searchParameters.apiCategory !== this.lastApiParameters.apiCategory;
    const diffApiParameters = areDiffKeywords || isDiffCategory;

    return keywordsMinLength && diffApiParameters;
  }

  initiateSearch = () => {
    if (this.shouldMakeApiCall()) {
      const { keywords, apiCategory } = this.state.searchParameters;
      this.lastApiParameters = { keywords, apiCategory };

      this.props.getApiData(this.state.searchParameters)
        .then(apiData => {
          this.futureListingData = apiData;
          this.setSearchStatus();
        })

    } else {
      this.setSearchStatus();
    } 
  }

  onUserViewResults = () => {
    this.props.onUserSearchDone(this.state.searchParameters, this.futureListingData);
    this.setState({viewResultsClicked: true})
  }

  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.inputTimer);
    if (!utils.areEqualObjects(this.state.searchParameters, prevState.searchParameters)) {
      console.log('Are not equal');
      this.inputTimer = setTimeout(this.initiateSearch, 500);
    }
  }

  componentDidMount() {
    let { keywords, apiCategory, apiMode } = this.props.lastApiParameters;
    this.lastApiParameters = { keywords, apiCategory, apiMode }
  }

  componentWillUnmount() {
    clearTimeout(this.inputTimer);
  }

  render() {
    if (this.state.viewResultsClicked) return <Redirect to='/listings'/>;
    
    return (
      <div className="searchContainer">
        <div className="searchHeader">
          <Link to="/listings" className="material-icons back-icon">arrow_back_ios</Link>
          <SearchStatus status={this.state.searchStatus}/>
          <button type="button" onClick={this.onUserViewResults} disabled={this.state.searchStatus !== 'done'}>Results</button>
        </div>

        <form className="searchInputFields" onChange={this.onChange}>
          <div className="input-group">
            <Input 
              type="text" 
              name="keywords" text="Search" 
              value={this.state.searchParameters.keywords} 
              autoFocus
              highlight={this.state.searchStatus === 'keywords length' || this.state.searchStatus === 'no results'}
            />
          </div>
          <div className="input-group">
            <InputSwitch
              name='apiCategory'
              options={{
                one: { 
                  display: 'Men\'s', 
                  value: 'mens'
                },
                two: { 
                  display: 'Women\'s',
                  value: 'womens'
                }
              }} 
              switchState={this.state.searchParameters.apiCategory}
              fontSize='fs-xlg'
            />
          </div>
          <div className="input-group">
            <Input 
              type="number" 
              name="markedPrice" 
              text="Store Price" 
              unit="$" 
              value={this.state.searchParameters.markedPrice}
              highlight={this.state.searchStatus === 'price null'}
            />
            <Input 
              type="number" 
              name="profit" 
              text="Desired Profit" 
              unit="$" 
              value={this.state.searchParameters.profit}
              highlight={this.state.searchStatus==='profit null'}
            />
            <Input 
              type="number" 
              name="sale" 
              text="Store Sale" 
              unit="%" 
              value={this.state.searchParameters.sale}
            />
            <Input 
              type="number" 
              name="buyerShipping" 
              text="Buyer Shipping Cost" 
              unit="$" 
              value={this.state.searchParameters.buyerShipping}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;