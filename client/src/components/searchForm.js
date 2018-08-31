import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { ApiCategory } from './';

import api from '../api';

import './searchForm.css';

class SearchForm extends Component {

  lastApiParameters = this.props.lastApiParameters;

  state = {
    apiMode: '/sold-listings',
    apiCategory: 'mens',
    form: {}
  }

  changeApiCategory = (event) => {
    let apiCategory = (event.target.id === 'mens') ? 'mens' : 'womens';
    this.setState({apiCategory});
  }

  shouldRequestData = () => {
    return (this.state.form.keywords !== this.lastApiParameters.keywords) ||
           (this.state.apiCategory !== this.lastApiParameters.apiCategory);
  }

  onChange = (event) => {
    let { target } = event;
    this.setState(({ form }) => {
      form[target.name] = target.value;
      return { form };
    });
  }

  getData = () => {
    let { apiMode, apiCategory, form } = this.state; 
    let { keywords, ...myPricingData } = form;
  
    if (this.shouldRequestData()) {
      api.get(apiMode, {
        keywords,
        apiCategory: apiCategory,
        page: '1'
      })
      .then(listingData => {
        this.lastApiParameters = { keywords, apiCategory }
        this.props.handleData(myPricingData, listingData);
      })
      .catch(error => console.log(error));
    }
    else {
      this.props.handleData(myPricingData, null, null);
    }
  } 


  render() {
    return (
      <div className="searchContainer">
        <div className="searchHeader">
          <Link to="/listings" className="material-icons back-icon">arrow_back_ios</Link>
          <Link to="listings">
            <button type="button" onClick={() => this.props.onDone(this.lastApiParameters)}>Done</button>
          </Link>
        </div>

        <form className="searchInputFields" onChange={this.onChange} onBlur={this.getData}>
          <div className="group1">
            <input type="text" name="keywords" placeholder="Search" value={this.state.form.keywords}/>
            <ApiCategory apiCategory={this.state.apiCategory} changeApiCategory={this.changeApiCategory}/>
          </div>
          <div className="group2">
            <input type="number" name="markedPrice" placeholder="markedPrice" value={this.state.form.markedParice}/>
            <input type="number" name="profit" placeholder="profit" value={this.state.form.profit}/>
          </div>
          <div className="group3">
            <input type="number" name="sale" defaultValue="20" value={this.state.form.sale}/>
            <input type="number" name="buyerShipping" defaultValue="10.50" value={this.state.form.buyerShipping}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;