import utils from '../utils';

let default_buyerShipping = 10.50,
    default_stateTax = 0.075;


export default {
  myOverallStats: (my) => {
    my = utils.objToFloat(my);

    let myCalc = {};
    
    my.buyerShipping = my.buyerShipping || default_buyerShipping;
    my.tax = default_stateTax;
    my.salePrice = (my.markedPrice - my.markedPrice * my.sale);

    myCalc.listFor = ((my.profit - 0.011 * my.buyerShipping + (1 + my.tax) * my.salePrice + 0.3) / 0.871);
    myCalc.roi = (my.profit / my.salePrice) * 100;
    myCalc.costToBuyer = (myCalc.listFor + my.buyerShipping);


    return utils.objToTwoDecimals(myCalc);
  },

  myStatsForListing: (myOverallStats, listing) => {
    myOverallStats = utils.objToFloat(myOverallStats);

    let myListingStats = {};
    
    myListingStats.priceDiff = myOverallStats.costToBuyer - parseFloat(listing.price);
    myListingStats.priceDiffPerc = myListingStats.priceDiff / parseFloat(listing.price) * 100;

    return utils.objToTwoDecimals(myListingStats);
  }
} 