import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Input, ApiCategory } from './';

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

  isValidInput = () => {
    let { keywords, markedPrice, profit, sale, buyerShipping } = this.state

    if (keywords.length < 4) return false;
    return true;
  }

  onChange = (event) => {
    clearTimeout(this.inputTimer);

    let { name, value } = this.transformInput(event.target);

    this.setState({[name]: value}, () => {
      this.inputTimer = setTimeout(() => {
      if(this.isValidInput()) this.updateData();
      }, 1000);
    });
    
  }

  shouldRequestData = () => {
    return (this.state.keywords !== this.lastApiParameters.keywords) ||
           (this.state.apiCategory !== this.lastApiParameters.apiCategory);
  }

  updateData = () => {
    this.props.updateData(this.state, this.shouldRequestData());
    this.lastApiParameters.keywords = this.state.keywords;
    this.lastApiParameters.apiCategory = this.state.apiCategory;
  } 

  onDone = () => {
    this.props.updateData(this.state, this.shouldRequestData())
      .then(() => this.props.onDone(this.state))
  }

  componentWillUnmount() {
    clearTimeout(this.inputTimer);
  }


  render() {
    return (
      <div className="searchContainer">
        <div className="searchHeader">
          <Link to="/listings" className="material-icons back-icon">arrow_back_ios</Link>
          <Link to="listings">
            <button type="button" onClick={this.onDone}>Done</button>
          </Link>
        </div>

        <form className="searchInputFields" onChange={this.onChange}>
          <div className="input-group">
            <Input type="text" name="keywords" text="Search" value={this.state.keywords}/>
          </div>
          <div className="input-group">
            <ApiCategory apiCategory={this.state.apiCategory} changeApiCategory={this.changeApiCategory}/>
          </div>
          <div className="input-group">
            <Input type="text" name="markedPrice" text="Store Price" unit="$" value={this.state.markedPrice}/>
            <Input type="text" name="profit" text="Desired Profit" unit="$" value={this.state.profit}/>
            <Input type="text" name="sale" text="Store Sale" unit="%" value={this.state.sale}/>
            <Input type="text" name="buyerShipping" text="Buyer Shipping Cost" unit="$" value={this.state.buyerShipping}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;