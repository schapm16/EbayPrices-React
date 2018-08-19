function transformListings(listings) {
  let transformedListings = listings.map((listing) => {
    return {
      title: listing.title[0],
      galleryURL: listing.galleryURL[0],
      viewItemURL: listing.viewItemURL[0],
      shippingCost:(listing.shippingInfo[0].shippingServiceCost) ? parseFloat(listing.shippingInfo[0].shippingServiceCost[0].__value__).toFixed(2) : "",
      price:parseFloat(listing.sellingStatus[0].convertedCurrentPrice[0].__value__).toFixed(2),
      startTime: listing.listingInfo[0].startTime[0],
      endTime: listing.listingInfo[0].endTime[0],
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

module.exports = (req, ebayAPIData) => {
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

  return transformedData;
}