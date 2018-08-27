const moment = require('moment');

const default_shippingCost = '10.50';

function transformListings(listings) {
  let transformedListings = listings.map((listing) => {
    return {
      itemId: listing.itemId[0],
      title: listing.title[0],
      galleryURL: listing.galleryURL[0],
      viewItemURL: listing.viewItemURL[0],
      shippingCost:(listing.shippingInfo[0].shippingServiceCost) ? parseFloat(listing.shippingInfo[0].shippingServiceCost[0].__value__).toFixed(2) : default_shippingCost,
      price:parseFloat(listing.sellingStatus[0].convertedCurrentPrice[0].__value__).toFixed(2),
      startTime: moment(listing.listingInfo[0].startTime[0]).format('MM/DD/YYYY HH:mm'),
      endTime: moment(listing.listingInfo[0].endTime[0]).format('MM/DD/YYYY HH:mm'),
      condition: listing.condition[0].conditionDisplayName[0],
      isMultiVariationListing: listing.isMultiVariationListing[0]
    }
  })

  return transformedListings;
}

function transformPagination(paginationOutput) {
  return {
    pageNumber: paginationOutput.pageNumber[0],
    totalPages: paginationOutput.totalPages[0]

  }
}

module.exports = (ebayAPIData) => {
  let accessedData;
  let transformedData = {}
  
  if (ebayAPIData.findCompletedItemsResponse){
    accessedData = ebayAPIData.findCompletedItemsResponse[0];
  } 
  else if (ebayAPIData.findItemsAdvancedResponse) {
    accessedData = ebayAPIData.findItemsAdvancedResponse[0];
  }
  
  transformedData.listings = transformListings(accessedData.searchResult[0].item);
  transformedData.pagination = transformPagination(accessedData.paginationOutput[0]);
  transformedData.timestamp = accessedData.timestamp[0];

  return transformedData;
}