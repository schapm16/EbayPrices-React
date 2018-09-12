import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { Input, InputSwitch, SearchStatus } from './';

import './searchForm.css';

class SearchForm extends Component {
  lastApiParameters = this.props.lastApiParameters
  inputTimer = '';

  state = {
    apiCategory: 'mens',
    keywords: '',
    sale: '20',
    buyerShipping: '10.50'
  }

  changeApiCategory = (event) => {
    let apiCategory = (event.target.id === 'mens') ? 'mens' : 'womens';
    this.setState({apiCategory}, () => {this.updateData()});
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

  setSearchStatus = (listingData) => {
    let { keywords, markedPrice, profit } = this.state
    let searchStatus = '';

    if (keywords.length < 4) searchStatus = 'keywords length';
    else if (listingData && listingData.listings.length === 0) searchStatus = 'no results';
    else if (!markedPrice) searchStatus = 'price null';
    else if (!profit) searchStatus = 'profit null';
    else searchStatus = 'done';

    this.setState({ searchStatus });
  }

  onChange = (event) => {
    clearTimeout(this.inputTimer);

    let { name, value } = this.transformInput(event.target);

    this.setState({[name]: value, searchStatus: 'searching'}, () => {
      this.inputTimer = setTimeout(() => {
      this.updateData().then((listingData) => {
        this.setSearchStatus(listingData);
      });
      }, 1000);
    });
  }

  shouldRequestData = () => {
    return (this.state.keywords !== this.lastApiParameters.keywords) ||
           (this.state.apiCategory !== this.lastApiParameters.apiCategory);
  }

  updateData = () => {
    return this.props.updateData(this.state, this.shouldRequestData())
      .then((listingData) => {
        this.lastApiParameters.keywords = this.state.keywords;
        this.lastApiParameters.apiCategory = this.state.apiCategory;
        return listingData;    
      })
  } 

  onDone = () => {
    this.props.onDone(this.state);
    this.setState({doneClicked: true});  
    
  }

  componentWillUnmount() {
    clearTimeout(this.inputTimer);
  }


  render() {
    if (this.state.doneClicked) return <Redirect to='/listings'/>;
    
    return (
      <div className="searchContainer">
        <div className="searchHeader">
          <Link to="/listings" className="material-icons back-icon">arrow_back_ios</Link>
          <SearchStatus status={this.state.searchStatus}/>
          <button type="button" onClick={this.onDone} disabled={this.state.searchStatus !== 'done'}>Results</button>
        </div>

        <form className="searchInputFields" onChange={this.onChange}>
          <div className="input-group">
            <Input 
              type="text" 
              name="keywords" text="Search" 
              value={this.state.keywords} 
              autoFocus
              highlight={this.state.searchStatus === 'keywords length' || this.state.searchStatus === 'no results'}
            />
          </div>
          <div className="input-group">
            <InputSwitch 
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
              switchState={this.state.apiCategory} 
              onClick={this.changeApiCategory}
              fontSize='fs-xlg'
            />
          </div>
          <div className="input-group">
            <Input 
              type="number" 
              name="markedPrice" 
              text="Store Price" 
              unit="$" 
              value={this.state.markedPrice}
              highlight={this.state.searchStatus === 'price null'}
            />
            <Input 
              type="number" 
              name="profit" 
              text="Desired Profit" 
              unit="$" 
              value={this.state.profit}
              highlight={this.state.searchStatus==='profit null'}
            />
            <Input 
              type="number" 
              name="sale" 
              text="Store Sale" 
              unit="%" 
              value={this.state.sale}
            />
            <Input 
              type="number" 
              name="buyerShipping" 
              text="Buyer Shipping Cost" 
              unit="$" 
              value={this.state.buyerShipping}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;