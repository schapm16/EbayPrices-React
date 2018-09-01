import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { ApiCategory } from './';

import './searchForm.css';

class SearchForm extends Component {
  lastApiParameters = this.props.lastApiParameters

  state = {
    apiCategory: 'mens',
    sale: '20',
    buyerShipping: '10.50'
  }

  changeApiCategory = (event) => {
    let apiCategory = (event.target.id === 'mens') ? 'mens' : 'womens';
    this.setState({
      apiCategory
    });
  }

  shouldRequestData = () => {
    return (this.state.keywords !== this.lastApiParameters.keywords) ||
           (this.state.apiCategory !== this.lastApiParameters.apiCategory);
  }

  onChange = (event) => {
    let { target } = event;
    this.setState({
      [target.name]: target.value
    });
  }

  updateData = () => {
    this.props.updateData(this.state, this.shouldRequestData());
    this.lastApiParameters.keywords = this.state.keywords;
    this.lastApiParameters.apiCategory = this.state.apiCategory;
  } 

  onDone = () => {
    this.props.updateData(this.state, this.shouldRequestData());
    this.props.onDone(this.state);
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

        <form className="searchInputFields" onChange={this.onChange} onBlur={this.updateData}>
          <div className="group1">
            <input type="text" name="keywords" placeholder="Search" value={this.state.keywords}/>
            <ApiCategory apiCategory={this.state.apiCategory} changeApiCategory={this.changeApiCategory}/>
          </div>
          <div className="group2">
            <input type="number" name="markedPrice" placeholder="markedPrice" value={this.state.markedPrice}/>
            <input type="number" name="profit" placeholder="profit" value={this.state.profit}/>
          </div>
          <div className="group3">
            <input type="number" name="sale" value={this.state.sale}/>
            <input type="number" name="buyerShipping" value={this.state.buyerShipping}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;