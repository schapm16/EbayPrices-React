import React, { Component } from 'react';

import api from '../api';

class SearchForm extends Component {
  myPricingData = {
    sale: 0.2,
    markedPrice: 38.99,
    buyerShipping: 10.50,
    profit: 15.00,
    stateTax: 0.075
  }

  state = {
    apiMode: '/sold-listings',
    form: {}
  }

  onChange = (event) => {
    let form = {};
    form[event.target.name] = event.target.value;
    
    this.setState({form});
  }

  onSearch = () => {
    if (this.props.currentSearchKeywords !== this.state.form.keywords) {
      api.get(this.state.apiMode, {
        keywords: this.state.form.keywords,
        gender: 'mens',
        page: '1'
      })
      .then(listingData => {
        this.props.handleData(this.myPricingData, listingData, this.state.form.keywords);
      })
      .catch(error => console.log(error));
    }
    else {
      this.props.handleData(this.myPricingData, null, null);
    }
  } 


  render() {
    return (
      <div onChange={(event) => this.onChange(event)}>
        <input type="text" name="keywords" />
        <button onClick={this.onSearch}>Search</button>
      </div>
    );
  }
}

export default SearchForm;