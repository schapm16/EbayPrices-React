import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { ApiCategory } from './';

import api from '../api';

import './searchForm.css';

class SearchForm extends Component {

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
    return this.props.currentApiParameters.keywords !== this.state.form.keywords ||
           this.props.currentApiParameters.apiCategory !== this.state.apiCategory;
  }

  onChange = (event) => {
    let { target } = event;
    this.setState(({ form }) => {
      form[target.name] = target.value;
      return { form };
    });
  }

  getData = (event) => {
    let { keywords, ...myPricingData } = this.state.form;
  
    if (this.shouldRequestData()) {
      api.get(this.state.apiMode, {
        keywords,
        apiCategory: this.state.apiCategory,
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
      <div className="searchContainer">
        <div className="searchHeader">
          <Link to="/listings" className="material-icons back-icon">arrow_back_ios</Link>
          <Link to="listings"><button type="button" onClick={this.props.onDone}>Done</button></Link>
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