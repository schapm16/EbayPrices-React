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

  shouldRequestData = () => {
    return (this.state.keywords !== this.lastApiParameters.keywords) ||
           (this.state.apiCategory !== this.lastApiParameters.apiCategory);
  }

  onChange = (event) => {
    clearTimeout(this.inputTimer);

    let { target } = event;
    this.setState({
      [target.name]: target.value
    });

    this.inputTimer = setTimeout(this.updateData, 500);
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

  componentWillUnmount() {
    console.log('Search unmounted');
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
            <Input type="number" name="markedPrice" text="Store Price" unit="$" value={this.state.markedPrice}/>
            <Input type="number" name="profit" text="Desired Profit" unit="$" value={this.state.profit}/>
            <Input type="number" name="sale" text="Store Sale" unit="%" value={this.state.sale}/>
            <Input type="number" name="buyerShipping" text="Buyer Shipping Cost" unit="$" value={this.state.buyerShipping}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;