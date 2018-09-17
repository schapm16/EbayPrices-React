import React, { Component } from 'react';

import './listingsContainer.css';

import { Listing } from './';


class ListingsContainer extends Component {

  disableOnScroll = false
  scrollEndTriggered = false;

  ref = React.createRef();

  onScroll = ({ target }) => {
    let { offsetHeight, scrollTop, scrollHeight } = target;
    if (scrollHeight - offsetHeight - scrollTop > offsetHeight * 2 || this.disableOnScroll) return;
    this.disableOnScroll = true;
    this.scrollEndTriggered = true;
    this.props.onListingScrollEnd();
  }

  componentDidUpdate(prevProps) {
    if (this.props.apiCallInProgress && this.scrollEndTriggered) {
      this.scrollEndTriggered = false;
    } else if (this.props.apiCallInProgress) {
      this.ref.current.scrollTop = 0;
      this.ref.current.style.opacity = '0.2';
    } else if (!this.props.apiCallInProgress) {
      this.disableOnScroll = false;
      this.ref.current.style.opacity = '1';
    }
  }

  render() {
    return (
      <div id="listingsContainer" ref={this.ref} onScroll={this.onScroll}>
        {this.props.listings.map(listing => {
          return <Listing key={listing.itemId} listing={listing}/>
        })}
      </div>
    );
  }
}

export default ListingsContainer;