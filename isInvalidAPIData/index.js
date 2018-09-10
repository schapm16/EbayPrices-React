module.exports = function(ebayAPIData) {
  if (!ebayAPIData.findCompletedItemsResponse && !ebayAPIData.findItemsAdvancedResponse) {
    return true;
  }

  let accessedData;

  if (ebayAPIData.findCompletedItemsResponse){
    accessedData = ebayAPIData.findCompletedItemsResponse[0];
  } 
  else if (ebayAPIData.findItemsAdvancedResponse) {
    accessedData = ebayAPIData.findItemsAdvancedResponse[0];
  }

  if (accessedData.searchResult[0]['@count'] === '0') return true;

  return false;
}