import React, { Component } from 'react';

import api from '../api';

import './searchForm.css';

class SearchForm extends Component {

  state = {
    apiMode: '/sold-listings',
    form: {}
  }

  shouldRequestData = () => {
    return this.props.currentSearchKeywords !== this.state.form.keywords;
  }

  onChange = (event) => {
    let { target } = event;
    this.setState(({ form }) => {
      form[target.name] = target.value;
      return { form };
    });
  }

  onDone = (event) => {
    event.preventDefault();
    let { keywords, ...myPricingData } = this.state.form;
  
    if (this.shouldRequestData()) {
      api.get(this.state.apiMode, {
        keywords,
        gender: 'mens',
        page: '1'
      })
      .then(listingData => {
        this.props.handleData(myPricingData, listingData, this.state.form.keywords);
      })
      .catch(error => console.log(error));
    }
    else {
      this.props.handleData(myPricingData, null, null);
    }
  } 


  render() {
    return (
      <div className="searchForm" onChange={(event) => this.onChange(event)}>
        <input type="text" name="keywords" placeholder="Search"/>
        <input type="number" name="markedPrice" placeholder="markedPrice"/>
        <input type="number" name="profit" placeholder="profit"/>
        <input type="number" name="sale" defaultValue="20" />
        <input type="number" name="buyerShipping" defaultValue="10.50" />
        <input type="submit" onClick={this.onDone} value="Done"/>
      </div>
    );
  }
}

export default SearchForm;